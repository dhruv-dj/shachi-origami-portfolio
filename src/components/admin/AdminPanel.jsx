import { useState, useEffect, useCallback } from 'react';
import { useContent } from '../../context/ContentContext';
import { deployContent } from '../../utils/githubApi';
import { resizeImage, fileSizeKB } from '../../utils/imageUtils';
import { setPassword, getLocalHash } from '../../utils/auth';

const GITHUB_SETTINGS_KEY = 'shachiGithubSettings';
const TABS = ['content', 'artworks', 'media', 'deploy'];

/* ─── Shared UI primitives ────────────────────────────── */

function Label({ children }) {
  return (
    <label className="block font-sans text-xs tracking-widest uppercase text-muted mb-1.5">
      {children}
    </label>
  );
}

function Input({ value, onChange, placeholder, type = 'text', className = '' }) {
  return (
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full border border-stone-200 bg-white px-3 py-2.5 font-sans text-sm text-ink focus:outline-none focus:border-wood transition-colors ${className}`}
    />
  );
}

function Textarea({ value, onChange, rows = 4, placeholder }) {
  return (
    <textarea
      value={value}
      onChange={e => onChange(e.target.value)}
      rows={rows}
      placeholder={placeholder}
      className="w-full border border-stone-200 bg-white px-3 py-2.5 font-sans text-sm text-ink focus:outline-none focus:border-wood transition-colors resize-y"
    />
  );
}

function Card({ title, children }) {
  return (
    <div className="bg-white border border-stone-100 p-4 sm:p-6 mb-4 sm:mb-6">
      {title && <h3 className="font-serif text-xl text-ink mb-4 sm:mb-5">{title}</h3>}
      {children}
    </div>
  );
}

function SavedBadge({ saved }) {
  if (!saved) return null;
  return (
    <span className="font-sans text-xs text-green-700 bg-green-50 border border-green-200 px-2 py-1 whitespace-nowrap">
      <span className="hidden sm:inline">Saved to preview</span>
      <span className="sm:hidden">Saved</span>
    </span>
  );
}

/* ─── Image uploader ──────────────────────────────────── */

function ImageUploader({ imageUrl, onImage, label = 'Image' }) {
  const [uploading, setUploading] = useState(false);

  async function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const dataUri = await resizeImage(file);
      const kb = fileSizeKB(dataUri);
      if (kb > 2048) {
        alert(`Image is ${kb}KB after compression — consider using a smaller file or an external URL for best deploy performance.`);
      }
      onImage(dataUri);
    } catch {
      alert('Could not process image. Try a different file.');
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {imageUrl && (
        <div className="relative w-full aspect-[3/2] bg-parchment overflow-hidden mb-2">
          <img src={imageUrl} alt="preview" className="w-full h-full object-cover" />
          <button
            onClick={() => onImage('')}
            className="absolute top-2 right-2 bg-ink/70 text-cream text-xs px-2 py-1 hover:bg-ink transition-colors"
          >
            Remove
          </button>
        </div>
      )}
      {/* Stack vertically on mobile, row on sm+ */}
      <div className="flex flex-col sm:flex-row gap-2">
        <label className="cursor-pointer inline-flex items-center justify-center border border-wood text-wood font-sans text-xs tracking-widest uppercase px-3 py-2.5 hover:bg-wood hover:text-cream transition-colors duration-200 sm:flex-shrink-0">
          {uploading ? 'Processing…' : 'Upload file'}
          <input type="file" accept="image/*" className="hidden" onChange={handleFile} disabled={uploading} />
        </label>
        <div className="flex items-center gap-2">
          <span className="font-sans text-muted text-xs sm:hidden">or paste a URL below</span>
          <span className="hidden sm:inline font-sans text-muted text-xs flex-shrink-0">or</span>
          <input
            type="url"
            value={imageUrl.startsWith('data:') ? '' : imageUrl}
            onChange={e => onImage(e.target.value)}
            placeholder="Paste image URL"
            className="flex-1 border border-stone-200 bg-white px-3 py-2.5 font-sans text-xs text-ink focus:outline-none focus:border-wood transition-colors min-w-0"
          />
        </div>
      </div>
    </div>
  );
}

/* ─── Content Tab ─────────────────────────────────────── */

function ContentTab({ local, onChange }) {
  const { hero, about } = local;

  function setHero(key, val) { onChange({ ...local, hero: { ...hero, [key]: val } }); }
  function setAbout(key, val) { onChange({ ...local, about: { ...about, [key]: val } }); }

  function setParagraph(i, val) {
    const paragraphs = [...about.paragraphs];
    paragraphs[i] = val;
    setAbout('paragraphs', paragraphs);
  }

  function addParagraph() { setAbout('paragraphs', [...about.paragraphs, '']); }
  function removeParagraph(i) { setAbout('paragraphs', about.paragraphs.filter((_, idx) => idx !== i)); }

  function setStat(i, key, val) {
    const stats = about.stats.map((s, idx) => idx === i ? { ...s, [key]: val } : s);
    setAbout('stats', stats);
  }
  function addStat() { setAbout('stats', [...about.stats, { value: '', label: '' }]); }
  function removeStat(i) { setAbout('stats', about.stats.filter((_, idx) => idx !== i)); }

  return (
    <div>
      <Card title="Hero Section">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <Label>Badge text</Label>
            <Input value={hero.badgeText} onChange={v => setHero('badgeText', v)} />
          </div>
          <div className="hidden sm:block" />
          <div>
            <Label>First name</Label>
            <Input value={hero.firstName} onChange={v => setHero('firstName', v)} />
          </div>
          <div>
            <Label>Last name</Label>
            <Input value={hero.lastName} onChange={v => setHero('lastName', v)} />
          </div>
        </div>
        <div className="mb-4">
          <Label>Tagline</Label>
          <Textarea value={hero.tagline} onChange={v => setHero('tagline', v)} rows={2} />
        </div>
        <div>
          <Label>Subtitle</Label>
          <Input value={hero.subtitle} onChange={v => setHero('subtitle', v)} />
        </div>
      </Card>

      <Card title="About Section">
        <div className="mb-6">
          <Label>Paragraphs</Label>
          {about.paragraphs.map((p, i) => (
            <div key={i} className="flex gap-2 mb-3">
              <Textarea value={p} onChange={v => setParagraph(i, v)} rows={3} />
              <button
                onClick={() => removeParagraph(i)}
                className="flex-shrink-0 w-8 text-muted hover:text-red-600 transition-colors text-xl leading-none"
                title="Remove paragraph"
              >
                ×
              </button>
            </div>
          ))}
          <button
            onClick={addParagraph}
            className="font-sans text-xs tracking-widest uppercase text-wood border border-wood px-3 py-2 hover:bg-wood hover:text-cream transition-colors"
          >
            + Add paragraph
          </button>
        </div>

        <div>
          <Label>Stats</Label>
          {about.stats.map((s, i) => (
            <div key={i} className="flex gap-2 mb-2 items-center">
              <Input value={s.value} onChange={v => setStat(i, 'value', v)} placeholder="8+" className="w-20 flex-shrink-0" />
              <Input value={s.label} onChange={v => setStat(i, 'label', v)} placeholder="Years folding" />
              <button
                onClick={() => removeStat(i)}
                className="flex-shrink-0 w-8 text-muted hover:text-red-600 transition-colors text-xl leading-none"
              >
                ×
              </button>
            </div>
          ))}
          <button
            onClick={addStat}
            className="font-sans text-xs tracking-widest uppercase text-wood border border-wood px-3 py-2 hover:bg-wood hover:text-cream transition-colors mt-1"
          >
            + Add stat
          </button>
        </div>
      </Card>

      <Card title="Contact">
        <Label>Inquiry email</Label>
        <Input
          type="email"
          value={local.contact?.email || ''}
          onChange={v => onChange({ ...local, contact: { ...local.contact, email: v } })}
          placeholder="your@email.com"
        />
        <p className="font-sans text-xs text-muted mt-1">Used for the "Inquire" button on each artwork.</p>
      </Card>
    </div>
  );
}

/* ─── Artworks Tab ────────────────────────────────────── */

function ArtworkEditor({ art, onUpdate, onRemove }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-stone-200 mb-3">
      <button
        className="w-full flex items-center justify-between px-4 py-3 bg-stone-50 active:bg-stone-100 transition-colors text-left"
        onClick={() => setOpen(o => !o)}
      >
        <span className="font-serif text-lg text-ink truncate pr-2">{art.title || 'Untitled artwork'}</span>
        <span className="text-muted text-sm flex-shrink-0">{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>Title</Label>
              <Input value={art.title} onChange={v => onUpdate({ ...art, title: v })} />
            </div>
            <div>
              <Label>Year</Label>
              <Input value={String(art.year)} onChange={v => onUpdate({ ...art, year: Number(v) || art.year })} type="number" />
            </div>
            <div>
              <Label>Medium</Label>
              <Input value={art.medium} onChange={v => onUpdate({ ...art, medium: v })} />
            </div>
            <div>
              <Label>Price</Label>
              <Input value={art.price} onChange={v => onUpdate({ ...art, price: v })} placeholder="₹6,500" />
            </div>
          </div>

          <div>
            <Label>Description</Label>
            <Textarea value={art.description} onChange={v => onUpdate({ ...art, description: v })} rows={3} />
          </div>

          <ImageUploader
            imageUrl={art.imageUrl || ''}
            onImage={url => onUpdate({ ...art, imageUrl: url })}
            label="Artwork image (replaces SVG placeholder)"
          />

          <div className="pt-2 border-t border-stone-100">
            <button
              onClick={onRemove}
              className="font-sans text-xs tracking-widest uppercase text-red-500 hover:text-red-700 border border-red-300 hover:border-red-500 px-3 py-2 transition-colors"
            >
              Remove artwork
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function ArtworksTab({ local, onChange }) {
  function updateArtwork(id, updated) {
    onChange({ ...local, artworks: local.artworks.map(a => a.id === id ? updated : a) });
  }

  function removeArtwork(id) {
    onChange({ ...local, artworks: local.artworks.filter(a => a.id !== id) });
  }

  function addArtwork() {
    const newId = Math.max(0, ...local.artworks.map(a => a.id)) + 1;
    onChange({
      ...local,
      artworks: [...local.artworks, {
        id: newId, title: 'New Artwork', year: new Date().getFullYear(),
        medium: '', price: '', description: '', imageUrl: '',
      }],
    });
  }

  return (
    <div>
      <Card title="Artworks">
        {local.artworks.map(art => (
          <ArtworkEditor
            key={art.id}
            art={art}
            onUpdate={updated => updateArtwork(art.id, updated)}
            onRemove={() => removeArtwork(art.id)}
          />
        ))}
        <button
          onClick={addArtwork}
          className="font-sans text-xs tracking-widest uppercase text-wood border border-wood px-4 py-2.5 hover:bg-wood hover:text-cream transition-colors mt-2 w-full sm:w-auto"
        >
          + Add artwork
        </button>
      </Card>
    </div>
  );
}

/* ─── Media Tab ───────────────────────────────────────── */

function MediaTab({ local, onChange }) {
  function setAboutPhoto(url) {
    onChange({ ...local, about: { ...local.about, photoUrl: url } });
  }

  function updateVideo(i, key, val) {
    const videos = [...(local.videos || [])];
    videos[i] = { ...videos[i], [key]: val };
    onChange({ ...local, videos });
  }

  function addVideo() {
    onChange({ ...local, videos: [...(local.videos || []), { title: '', embedUrl: '' }] });
  }

  function removeVideo(i) {
    onChange({ ...local, videos: (local.videos || []).filter((_, idx) => idx !== i) });
  }

  return (
    <div>
      <Card title="Artist Portrait">
        <p className="font-sans text-xs text-muted mb-4">
          Replaces the origami crane SVG placeholder in the About section.
        </p>
        <ImageUploader
          imageUrl={local.about?.photoUrl || ''}
          onImage={setAboutPhoto}
          label="Portrait photo"
        />
      </Card>

      <Card title="Videos">
        <p className="font-sans text-xs text-muted mb-4">
          Add YouTube or Vimeo embed URLs. These appear in the media section of the site.
        </p>
        {(local.videos || []).map((v, i) => (
          <div key={i} className="border border-stone-200 p-4 mb-3 space-y-3">
            <div>
              <Label>Video title</Label>
              <Input value={v.title} onChange={val => updateVideo(i, 'title', val)} placeholder="e.g. Behind the Folds — Kusudama" />
            </div>
            <div>
              <Label>Embed URL</Label>
              <Input
                type="url"
                value={v.embedUrl}
                onChange={val => updateVideo(i, 'embedUrl', val)}
                placeholder="https://www.youtube.com/embed/..."
              />
              <p className="font-sans text-xs text-muted mt-1">Use the YouTube/Vimeo embed URL, not the watch URL.</p>
            </div>
            {v.embedUrl && (
              <div className="aspect-video bg-black overflow-hidden">
                <iframe
                  src={v.embedUrl}
                  title={v.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}
            <button
              onClick={() => removeVideo(i)}
              className="font-sans text-xs tracking-widest uppercase text-red-500 hover:text-red-700 border border-red-300 hover:border-red-500 px-3 py-2 transition-colors"
            >
              Remove video
            </button>
          </div>
        ))}
        <button
          onClick={addVideo}
          className="font-sans text-xs tracking-widest uppercase text-wood border border-wood px-4 py-2.5 hover:bg-wood hover:text-cream transition-colors w-full sm:w-auto"
        >
          + Add video
        </button>
      </Card>
    </div>
  );
}

/* ─── Deploy Tab ──────────────────────────────────────── */

function DeployTab({ local, clearDraft }) {
  const [settings, setSettings] = useState(() => {
    try { return JSON.parse(localStorage.getItem(GITHUB_SETTINGS_KEY)) || { owner: '', repo: '' }; }
    catch { return { owner: '', repo: '' }; }
  });
  const [token, setToken] = useState(sessionStorage.getItem('shachiGhToken') || '');
  const [status, setStatus] = useState('');
  const [deploying, setDeploying] = useState(false);

  // Change password state
  const [newPwd, setNewPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [pwdError, setPwdError] = useState('');
  const [pwdSuccess, setPwdSuccess] = useState(false);

  function saveSettings(patch) {
    const next = { ...settings, ...patch };
    setSettings(next);
    localStorage.setItem(GITHUB_SETTINGS_KEY, JSON.stringify(next));
  }

  function saveToken(val) {
    setToken(val);
    sessionStorage.setItem('shachiGhToken', val);
  }

  async function handleDeploy() {
    if (!settings.owner || !settings.repo) { setStatus('error:Please enter the GitHub repository.'); return; }
    if (!token) { setStatus('error:Please enter your GitHub Personal Access Token.'); return; }
    setDeploying(true);
    setStatus('');
    try {
      const hash = getLocalHash();
      await deployContent(token, settings.owner, settings.repo, local, hash);
      setStatus('ok:Deployed! GitHub Actions will rebuild the site in ~2 minutes.');
    } catch (err) {
      setStatus(`error:Deploy failed — ${err.message}`);
    } finally {
      setDeploying(false);
    }
  }

  async function handleChangePassword(e) {
    e.preventDefault();
    setPwdError('');
    setPwdSuccess(false);
    if (newPwd.length < 8) { setPwdError('Password must be at least 8 characters.'); return; }
    if (newPwd !== confirmPwd) { setPwdError('Passwords do not match.'); return; }
    await setPassword(newPwd);
    setNewPwd('');
    setConfirmPwd('');
    setPwdSuccess(true);
  }

  const statusParts = status.split(':');
  const statusType = statusParts[0] || '';
  const statusMsg = statusParts.slice(1).join(':') || '';

  return (
    <div>
      <Card title="GitHub Repository">
        <p className="font-sans text-sm text-muted mb-5 leading-relaxed">
          Clicking <strong>Save &amp; Deploy</strong> commits{' '}
          <code className="bg-stone-100 px-1 text-xs">public/siteContent.json</code> and{' '}
          <code className="bg-stone-100 px-1 text-xs">public/adminConfig.json</code> (with
          your password hash) to GitHub. After the ~2 min rebuild, the password works on any device.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <Label>Repository owner</Label>
            <Input value={settings.owner} onChange={v => saveSettings({ owner: v })} placeholder="e.g. dhruv-dj" />
          </div>
          <div>
            <Label>Repository name</Label>
            <Input value={settings.repo} onChange={v => saveSettings({ repo: v })} placeholder="e.g. shachi-origami-portfolio" />
          </div>
        </div>
        <div className="mb-6">
          <Label>GitHub Personal Access Token</Label>
          <Input
            type="password"
            value={token}
            onChange={saveToken}
            placeholder="ghp_..."
          />
          <p className="font-sans text-xs text-muted mt-1.5 leading-relaxed">
            Needs <strong>Contents: Read &amp; Write</strong> on this repo.{' '}
            Stored in sessionStorage — cleared when you close the tab.
          </p>
        </div>

        {status && (
          <div className={`font-sans text-sm px-4 py-3 mb-4 border ${statusType === 'ok' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-700'}`}>
            {statusMsg}
          </div>
        )}

        <button
          onClick={handleDeploy}
          disabled={deploying}
          className="w-full sm:w-auto bg-wood text-cream font-sans text-sm tracking-widest uppercase px-6 py-3 hover:bg-wood-dark transition-colors duration-200 disabled:opacity-50"
        >
          {deploying ? 'Deploying…' : 'Save & Deploy to GitHub'}
        </button>
      </Card>

      <Card title="Change Password">
        <p className="font-sans text-sm text-muted mb-4 leading-relaxed">
          Updates your password locally and marks it for the next deploy.
          Click <strong>Save &amp; Deploy</strong> above to persist it to the repository.
        </p>
        <form onSubmit={handleChangePassword} className="space-y-3">
          <div>
            <Label>New password</Label>
            <Input type="password" value={newPwd} onChange={setNewPwd} placeholder="Min 8 characters" />
          </div>
          <div>
            <Label>Confirm new password</Label>
            <Input type="password" value={confirmPwd} onChange={setConfirmPwd} placeholder="Repeat password" />
          </div>
          {pwdError && (
            <p className="font-sans text-xs text-red-600 bg-red-50 border border-red-200 px-3 py-2">{pwdError}</p>
          )}
          {pwdSuccess && (
            <p className="font-sans text-xs text-green-700 bg-green-50 border border-green-200 px-3 py-2">
              Password updated locally — deploy to save it to the repository.
            </p>
          )}
          <button
            type="submit"
            className="w-full sm:w-auto font-sans text-xs tracking-widest uppercase text-wood border border-wood px-4 py-2.5 hover:bg-wood hover:text-cream transition-colors"
          >
            Update password
          </button>
        </form>
      </Card>

      <Card title="Local Draft">
        <p className="font-sans text-sm text-muted mb-4 leading-relaxed">
          Your current edits are saved as a local draft in this browser. Clearing the draft reloads
          content from the last deployed version.
        </p>
        <button
          onClick={() => {
            if (confirm('Clear your local draft and reload from the deployed site?')) clearDraft();
          }}
          className="w-full sm:w-auto font-sans text-xs tracking-widest uppercase text-muted border border-stone-300 px-4 py-2.5 hover:border-muted hover:text-ink transition-colors"
        >
          Clear local draft
        </button>
      </Card>
    </div>
  );
}

/* ─── Main AdminPanel ─────────────────────────────────── */

export default function AdminPanel({ onLogout }) {
  const { content, updateContent, clearDraft } = useContent();
  const [local, setLocal] = useState(content);
  const [activeTab, setActiveTab] = useState('content');
  const [saved, setSaved] = useState(false);

  const handleChange = useCallback((updated) => {
    setLocal(updated);
    updateContent(updated);
    setSaved(true);
    const t = setTimeout(() => setSaved(false), 2000);
    return () => clearTimeout(t);
  }, [updateContent]);

  useEffect(() => { setLocal(content); }, [content]);

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Top bar */}
      <header className="sticky top-0 z-50 bg-ink text-cream px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
          <span className="font-serif text-base sm:text-lg truncate">Shachi Origami</span>
          <span className="hidden sm:inline font-sans text-xs tracking-widest uppercase text-cream/50">Admin</span>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <SavedBadge saved={saved} />
          <a
            href={import.meta.env.BASE_URL}
            target="_blank"
            rel="noreferrer"
            className="font-sans text-xs tracking-widest uppercase text-cream/70 hover:text-cream transition-colors"
          >
            <span className="hidden sm:inline">View site ↗</span>
            <span className="sm:hidden text-base leading-none" aria-label="View site">↗</span>
          </a>
          <button
            onClick={onLogout}
            className="font-sans text-xs tracking-widest uppercase text-cream/70 hover:text-cream transition-colors"
          >
            Log out
          </button>
        </div>
      </header>

      {/* Tab bar — horizontally scrollable on mobile */}
      <nav className="bg-white border-b border-stone-200 overflow-x-auto">
        <div className="flex px-2 sm:px-6 min-w-max">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`font-sans text-xs tracking-widest uppercase px-4 sm:px-5 py-3 sm:py-4 border-b-2 whitespace-nowrap transition-colors ${
                activeTab === tab
                  ? 'border-wood text-wood'
                  : 'border-transparent text-muted hover:text-ink'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {activeTab === 'content' && <ContentTab local={local} onChange={handleChange} />}
        {activeTab === 'artworks' && <ArtworksTab local={local} onChange={handleChange} />}
        {activeTab === 'media' && <MediaTab local={local} onChange={handleChange} />}
        {activeTab === 'deploy' && <DeployTab local={local} clearDraft={clearDraft} />}
      </main>
    </div>
  );
}
