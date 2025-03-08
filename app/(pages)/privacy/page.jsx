export default function PrivacyPolicy() {
  return (
    <div className="mx-auto grid place-items-center min-h-screen">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-4 text-3xl font-bold">Privacy Policy</h1>
        <p>
          This site uses JSON Web Tokens and a Key-Value database for sessions.
          Data provided to this site is exclusively used to support signing in
          and is not passed to any third party services, other than via SMTP or
          OAuth for the purposes of authentication.
        </p>
      </div>
    </div>
  );
}
