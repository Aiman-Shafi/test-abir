import os
import subprocess
import boto3

def build_npm_project():
    try:
        # Run the npm build command
        result = subprocess.run(['npm', 'run', 'build'], check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        print(result.stdout.decode())
    except subprocess.CalledProcessError as e:
        print(f"Error during build: {e}")
        print(e.stderr.decode())
        return False
    return True

def upload_to_s3(bucket_name, folder_path):
    s3 = boto3.client('s3')
    
    # Assuming all assets are in a 'dist' folder after the build
    for root, _, files in os.walk(folder_path):
        for file in files:
            file_path = os.path.join(root, file)
            s3_path = os.path.relpath(file_path, folder_path)
            
            # Set specific content types based on file extension
            if file_path.endswith('.html'):
                content_type = 'text/html'
            elif file_path.endswith('.js'):
                content_type = 'application/javascript'
            else:
                content_type = 'application/octet-stream'
            
            print(f"Uploading {file_path} to {bucket_name}/{s3_path} with content type {content_type}")
            s3.upload_file(file_path, bucket_name, s3_path, ExtraArgs={'ContentType': content_type})

def main():
    # Define your S3 bucket name and the path to your build assets
    BUCKET_NAME = "beta.investloupt.com"
    FOLDER_PATH = "./dist"  # Or wherever your build assets get stored
    
    if build_npm_project():
        upload_to_s3(BUCKET_NAME, FOLDER_PATH)
    else:
        print("Build failed. Aborting upload.")

if __name__ == "__main__":
    main()