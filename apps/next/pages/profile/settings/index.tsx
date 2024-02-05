import Settings from 'app/screens/user/Settings';
import { AuthWrapper } from 'auth/authWrapper';

// export const runtime = 'experimental-edge'

export default function SettingsPage() {
  return (
    <>
      <Settings />
    </>
  );
}

SettingsPage.getLayout = function getLayout(page: any) {
  return <AuthWrapper>{page}</AuthWrapper>;
};
