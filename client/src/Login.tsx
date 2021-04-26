import { gql, useLazyQuery } from "@apollo/client";
import { GoogleLogin } from "react-google-login";

const authQuery = gql`
  query AuthData($email: String!, $idToken: String!) {
    oauthLogin(data: { email: $email, idToken: $idToken }) {
      token
    }
  }
`;

function Login() {
  const [login, { loading, data, error }] = useLazyQuery(authQuery);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  const onSignInSuccess = (googleUser: any) => {
    const profile = googleUser.getBasicProfile();
    const email = profile.getEmail();
    const idToken = googleUser.getAuthResponse().id_token;
    sendToServer({ email, idToken });
  };

  const onSignInFailure = (response: any) => {
    console.log("Request failed");
    console.log(response);
  };

  const sendToServer = async (data: { email: string; idToken: string }) => {
    console.log("Request sent");
    login({ variables: { email: data.email, idToken: data.idToken } });
  };

  return (
    <>
      <GoogleLogin
        clientId="1093181997879-2d5j08rd7v2vd3uh0mbfufnk0nuj8717.apps.googleusercontent.com"
        buttonText="Login or Signup"
        onSuccess={onSignInSuccess}
        onFailure={onSignInFailure}
      />
      {data && data.oauthLogin}
    </>
  );
}

export default Login;
