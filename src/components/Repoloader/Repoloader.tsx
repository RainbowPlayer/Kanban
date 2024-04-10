import { useState } from "react";

interface RepoLoaderProps {
  onRepoLoad: (owner: string, repo: string) => void;
}  


const RepoLoader = ({ onRepoLoad }: RepoLoaderProps) => {
  const [repoUrl, setRepoUrl] = useState('');

  const handleLoad = () => {
    const pathMatch = repoUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
    if (pathMatch) {
      const owner = pathMatch[1];
      const repo = pathMatch[2];
      onRepoLoad(owner, repo);
    } else {
      alert('Please enter a valid GitHub repository URL.');
    }
  };

  return (
    <div className="container mt-3">
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          placeholder="Enter GitHub Repo URL"
          aria-label="GitHub Repo URL"
          aria-describedby="button-addon2"
        />
        <button
          className="btn btn-outline-secondary"
          type="button"
          id="button-addon2"
          onClick={handleLoad}
        >
          Load
        </button>
      </div>
    </div>
  );
};

export default RepoLoader;
