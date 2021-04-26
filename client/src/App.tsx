import axios from "axios";
import { GoogleLogin } from "react-google-login";

function App() {
  const onSignInSuccess = (googleUser: any) => {
    const profile = googleUser.getBasicProfile();
    const firstname = profile.getGivenName();
    const lastname = profile.getFamilyName();
    const imageUrl = profile.getImageUrl();
    const email = profile.getEmail();
    const id_token = googleUser.getAuthResponse().id_token;
    sendToServer({ firstname, lastname, email, imageUrl, id_token });
  };

  const onSignInFailure = (response: any) => {
    console.log(response);
  };

  const sendToServer = async (data: {
    firstname: string;
    lastname: string;
    email: string;
    imageUrl: string;
    id_token: string;
  }) => {
    try {
      const response = await axios.post("http://localhost:8000/oauth", {
        data,
      });
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <header className="App-header">Hello Odin Book</header>
      <GoogleLogin
        clientId=""
        buttonText="Login or Signup"
        onSuccess={onSignInSuccess}
        onFailure={onSignInFailure}
      />
    </div>
  );
}

export default App;
