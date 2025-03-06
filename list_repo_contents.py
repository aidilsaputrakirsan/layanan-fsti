import os
from datetime import datetime

def list_repo_contents(repo_path, output_file):
    """
    List contents of the repository, including file contents for text-based files.
    
    Args:
        repo_path (str): Path to the repository root directory
        output_file (str): Path to the output text file
    """
    # Excluded directories and files
    exclude_dirs = {
        'node_modules', 
        '.next', 
        '.git'
    }
    
    exclude_files = {
        '.gitignore', 
        'package-lock.json'
    }
    
    # File extensions to include contents for
    text_extensions = {
        '.txt', '.md', '.js', '.json', '.py', '.html', '.css', 
        '.yml', '.yaml', '.toml', '.ini', '.cfg', '.conf', 
        '.ts', '.tsx', '.jsx', '.vue', '.rs', '.go', '.c', '.cpp', 
        '.java', '.php', '.sh', '.bat', '.sql', '.xml'
    }
    
    def should_exclude(name):
        """Check if a file or directory should be excluded."""
        return (name in exclude_dirs or 
                name in exclude_files or 
                name.startswith('.') and name not in ['.eslintrc.mjs', '.tailwind.config.js'])
    
    def is_text_file(filename):
        """Check if file is a text file based on extension."""
        return any(filename.lower().endswith(ext) for ext in text_extensions)
    
    # Open the output file
    with open(output_file, 'w', encoding='utf-8') as f:
        # Write header with timestamp
        f.write(f"Repository Contents - Generated on {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
        f.write("=" * 80 + "\n\n")
        
        def write_directory_contents(directory, indent=''):
            """Recursively write directory contents to file."""
            try:
                # Sort items to ensure consistent output
                items = sorted(os.listdir(directory))
                
                for item in items:
                    # Skip excluded items
                    if should_exclude(item):
                        continue
                    
                    full_path = os.path.join(directory, item)
                    
                    # Write directories
                    if os.path.isdir(full_path):
                        f.write(f"{indent}📁 {item}/\n")
                        write_directory_contents(full_path, indent + '  ')
                    
                    # Write files
                    else:
                        f.write(f"{indent}📄 {item}\n")
                        
                        # Try to read and write contents of text files
                        if is_text_file(item):
                            try:
                                with open(full_path, 'r', encoding='utf-8') as content_file:
                                    file_contents = content_file.read()
                                    
                                    # Write file contents with some formatting
                                    f.write(f"{indent}  Contents of {item}:\n")
                                    f.write(f"{indent}  " + "-" * 50 + "\n")
                                    f.write(f"{indent}  {file_contents}\n")
                                    f.write(f"{indent}  " + "-" * 50 + "\n\n")
                            except (UnicodeDecodeError, PermissionError, IOError):
                                f.write(f"{indent}  ⚠️ Unable to read file contents\n\n")
                        else:
                            f.write(f"{indent}  ⚠️ Binary or unsupported file type\n\n")
            
            except PermissionError:
                f.write(f"{indent}⚠️ Unable to access directory: {directory}\n")
        
        # Start listing from the repository root
        write_directory_contents(repo_path)
        
        # Write footer
        f.write("=" * 80 + "\n")
        f.write(f"Total repositories scanned: 1\n")
        f.write(f"Scan location: {repo_path}")
    
    print(f"Repository contents have been written to {output_file}")

# Ensure the script is run directly
if __name__ == "__main__":
    # Use the current directory as the repository path
    repo_path = os.getcwd()
    
    # Create output file name with timestamp
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    output_file = os.path.join(repo_path, f'repo_contents_{timestamp}.txt')
    
    # List repository contents
    list_repo_contents(repo_path, output_file)