import Cover from "../components/auth/Cover";

import ResponsiveContainer from "../components/responsive/ResponsiveContainer";
import ConditionalAuth from "../components/auth/ConditionalAuth";

function AuthPage() {
  return (
    <>
      <Cover />
      <ResponsiveContainer type="section">
        <ConditionalAuth />
      </ResponsiveContainer>
    </>
  );
}

export default AuthPage;
