# ClipFlow 📋⚡

**ClipFlow** is an online clipboard built with Next.js that allows users to store and retrieve text and files using a unique `refid`. If you visit `https://clip-flow-master.vercel.app/`, a new `refid` will be automatically generated, and you will be redirected to it.

## 🛠️ Features

- **Auto-Generated RefIDs**: Visiting `https://clip-flow-master.vercel.app/` creates a unique `refid` and redirects you.
- **Persistent Storage**: Each `refid` gets its own text and file storage.
- **Instant Access**: Retrieve or modify stored text and files by visiting `https://clip-flow-master.vercel.app/{refid}`.
- **Real-time Syncing**: Updates are automatically saved.
- **File Sharing**: Upload and download files linked to each `refid`.
- **Simple & Secure**: No logins required, ensuring privacy.
- **Minimalist UI**: Clean, distraction-free interface.

## 📌 How It Works

1. **Visit ClipFlow**: Open `https://clip-flow-master.vercel.app/`.

   - A new `refid` will be created, and you will be redirected to `https://clip-flow-master.vercel.app/{new-refid}`.

2. **Store Text & Files**:

   - Type or paste text into the page.
   - Upload files to associate with the `refid`.

3. **Retrieve Later**: Open the same URL (`https://clip-flow-master.vercel.app/{refid}`) anytime to view, modify, or download stored content.

4. **Update Anytime**: Modify text and upload new files as needed.

## 🚀 Tech Stack

### Frontend

- **Next.js**: Server-side rendering and API routes.
- **Tailwind CSS**: Modern and responsive styling.
- **DaisyUI**: Pre-styled Tailwind components for a beautiful UI.
- **React Hooks**: Efficient state management.

### Backend

- **Node.js**: JavaScript runtime.
- **MongoDB**: Stores text and file metadata mapped to each `refid`.
- **Google Drive** : Stores uploaded files.

## 🛠️ Setup Instructions

### Prerequisites

- Node.js (v18+)
- MongoDB (local or cloud instance)
- Google Drive

### Installation

1.  Clone the repository:

    ```sh
    git clone https://github.com/FaizanAhmed0107/ClipFlow.git
    cd ClipFlow
    ```

2.  Install dependencies:

    ```sh
    npm install
    ```

3.  Configure environment variables:

    Create a .env.local file and add:

    ```ini
    MONGODB_URI=your-mongodb-connection-string
    ```

4.  Start the development server:

    ```sh
    npm run dev
    ```

# 🤝 Contributing

Contributions are welcome! To contribute:

1. **Fork the repository**.
2. **Create a new feature branch**:
   ```bash
   git checkout -b feature-branch-name
   ```
3. **Commit your changes**:
   ```bash
   git commit -m "Description of changes"
   ```
4. **Push to your branch**:
   ```bash
   git push origin feature-branch-name
   ```
5. **Submit a pull request**

## 📬 Contact

For queries or collaboration opportunities, feel free to reach out:

- **Email**: [guddukrm17@gmail.com](mailto:guddukrm17@gmail.com)
