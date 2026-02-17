# Project Zenith Deployment Instructions

## 1. Supabase Setup
The backend infrastructure requires a one-time SQL setup.
1.  Go to your Supabase Project Dashboard -> SQL Editor.
2.  Open the `SUPABASE_SETUP.sql` file generated in the project root.
3.  Copy and Paste the content into the SQL Editor and click **RUN**.
    *   This sets up the `profiles` table, the `handle_new_user` trigger for automated onboarding, and the `delete_snap_on_view` logic.

## 2. Environment Variables
Ensure you have your specific Supabase keys in `.env` (or `.env.local`):
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## 3. Data Safety & Compliance
*   **Privacy Policy**: A static Privacy Policy page is now compliant with 2026 standards and accessible via **Settings -> Privacy -> Privacy Policy**.
*   **Data Safety**: Refer to `DATA_SAFETY.md` for the exact text to paste into the App Store / Google Play Data Safety forms.
*   **App-ads.txt**: A placeholder `public/app-ads.txt` has been created. Update `pub-0000000000000000` with your actual AdMgr ID if using ads.

## 4. Frontend & AR
*   **Google Sign-In**: The app now starts with an Authentication Screen (`AuthView`). It automatically redirects to the Camera upon successful login.
*   **Neon Head-Dodge**: The AR Game filter has been added to the lens carousel. It uses a mocked Face Detector for the collision logic (nose mapping to player X). For production, ensure the `face_mesh` library is fully wired to the `detectFace` function in `src/utils/arFilters.js`.

## 5. Build & Deploy
Run the following to build the production web app:
```bash
npm run build
```
Deploy the `dist/` folder to Netlify, Vercel, or Firebase Hosting.
