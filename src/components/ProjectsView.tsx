import React from 'react';
import { useApp } from '../context/AppContext';
import { PhotoGrid } from './PhotoGrid';
import {
  FolderOpen,
  Send,
  ArrowLeft,
  Camera,
  Layers,
  Sparkles,
  User,
  SlidersHorizontal,
} from 'lucide-react';
import { Project } from '../types';

export const ProjectsView: React.FC = () => {
  const {
    projects,
    photos,
    users,
    selectedProject,
    setSelectedProject,
    openTransferModalForProject,
    selectedPhotographer,
    setSelectedPhotographer,
    setActiveTab,
    setActiveChatFriend,
  } = useApp();

  // If a specific project is selected, show that project's curated album
  if (selectedProject) {
    const projectPhotos = photos.filter(p => p.projectId === selectedProject.id);
    const author = users.find(u => u.id === selectedProject.userId);

    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* Back link */}
        <button
          onClick={() => setSelectedProject(null)}
          className="mb-6 flex items-center gap-1.5 font-mono-code text-xs text-neutral-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to All Projects</span>
        </button>

        {/* Project Header Banner */}
        <div className="mb-10 border-b border-neutral-800 pb-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 font-mono-code text-[10px] uppercase tracking-widest text-neutral-400">
                <span className="h-2 w-2 bg-white" />
                <span>ARCHIVAL PORTFOLIO</span>
                <span>•</span>
                <span>{selectedProject.category}</span>
                <span>•</span>
                <span>{projectPhotos.length} NEGATIVES</span>
              </div>

              <h1 className="mt-2 font-editorial text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {selectedProject.title}
              </h1>

              <p className="mt-3 text-sm leading-relaxed text-neutral-300">
                {selectedProject.description}
              </p>

              {author && (
                <div
                  onClick={() => {
                    setSelectedPhotographer(author);
                    setActiveChatFriend(author.username);
                    setActiveTab('friends');
                  }}
                  className="mt-4 inline-flex items-center gap-2.5 border border-neutral-800 bg-neutral-950 px-3 py-1.5 cursor-pointer hover:border-neutral-500 transition-colors"
                >
                  <img
                    src={author.avatar}
                    alt={`@${author.username}`}
                    className="h-6 w-6 grayscale object-cover ring-1 ring-neutral-700"
                  />
                  <span className="font-mono-code text-xs font-semibold text-white">
                    @{author.username}
                  </span>
                </div>
              )}
            </div>

            {/* Send Folder Shortcut */}
            <div className="shrink-0">
              <button
                onClick={() => openTransferModalForProject(selectedProject)}
                className="flex items-center gap-2 border border-white bg-white px-5 py-2.5 text-xs font-bold tracking-wider uppercase text-black hover:bg-neutral-200 transition-colors"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Send Folder to Client</span>
              </button>
            </div>
          </div>
        </div>

        {/* The Photos in this project */}
        <PhotoGrid photos={projectPhotos} showControls={true} />
      </div>
    );
  }

  // Otherwise, list of all projects / albums
  const displayedProjects = selectedPhotographer
    ? projects.filter(p => p.userId === selectedPhotographer.id)
    : projects;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="mb-8 border-b border-neutral-800 pb-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 font-mono-code text-[10px] uppercase tracking-widest text-neutral-400">
              <span className="h-2 w-2 bg-white" />
              <span>PORTFOLIO DIRECTORY</span>
            </div>
            <h1 className="mt-1 font-editorial text-2xl font-bold text-white sm:text-3xl">
              Curated Photography Projects
            </h1>
            <p className="mt-1 text-xs text-neutral-400">
              Browse thematic series, architectural studies, and darkroom collections.
            </p>
          </div>

          {selectedPhotographer && (
            <button
              onClick={() => setSelectedPhotographer(null)}
              className="font-mono-code text-xs text-neutral-400 hover:text-white"
            >
              Clear photographer filter (Showing @{selectedPhotographer.username})
            </button>
          )}
        </div>
      </div>

      {/* Projects Grid */}
      {displayedProjects.length === 0 ? (
        <div className="flex min-h-[300px] flex-col items-center justify-center border-2 border-dashed border-neutral-800 rounded-2xl p-12 text-center bg-neutral-900/30">
          <FolderOpen className="mb-3 h-8 w-8 text-neutral-500" />
          <h3 className="font-sans text-lg font-semibold text-white">No Projects Found</h3>
          <p className="mt-1 font-mono-code text-xs text-neutral-400">
            Create a project or publish collections to start curating your photography portfolio.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {displayedProjects.map(project => {
          const author = users.find(u => u.id === project.userId);
          const count = photos.filter(p => p.projectId === project.id).length;

          return (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer border border-neutral-900 bg-neutral-950 transition-all duration-300 hover:border-neutral-600 hover:-translate-y-1"
            >
              {/* Cover Image */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                <img
                  src={project.coverPhotoUrl}
                  alt={project.title}
                  className="h-full w-full object-cover grayscale transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between font-mono-code text-[11px] text-white">
                  <span className="bg-black/80 px-2 py-0.5 border border-neutral-700 text-[10px] uppercase">
                    {project.category}
                  </span>
                  <span className="text-[10px] text-neutral-300">
                    {count} Archival Frames
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-5">
                <h3 className="font-editorial text-lg font-bold text-white group-hover:text-neutral-200">
                  {project.title}
                </h3>
                <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-neutral-400">
                  {project.description}
                </p>

                <div className="mt-4 flex items-center justify-between border-t border-neutral-900 pt-3">
                  {author && (
                    <div className="flex items-center gap-2">
                      <img
                        src={author.avatar}
                        alt={`@${author.username}`}
                        className="h-5 w-5 grayscale object-cover ring-1 ring-neutral-700"
                      />
                      <span className="font-mono-code text-[11px] text-neutral-300">
                        @{author.username}
                      </span>
                    </div>
                  )}

                  <button
                    onClick={e => {
                      e.stopPropagation();
                      openTransferModalForProject(project);
                    }}
                    title="Send folder to client"
                    className="flex items-center gap-1 font-mono-code text-[10px] uppercase tracking-wider text-neutral-400 hover:text-white"
                  >
                    <Send className="h-3 w-3" />
                    <span>Send</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      )}
    </div>
  );
};
