function validateForm() 
{
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;

  if (username === '' || password === '') 
  {
      alert('Username and password are required');
      return false;
  }

  // Check the length of the username (you can adjust the minimum and maximum lengths)
  if (username.length < 4 || username.length > 40) {
      alert('Username must be between 4 and 40 characters');
      return false;
  }

  // Check the complexity of the password (you can adjust these conditions)
  if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}/.test(password)) {
      alert('Password must contain at least one lowercase letter, one uppercase letter, one digit, and be at least 8 characters long');
      return false;
  }
}


var FingerprintMatcher = function(probe) {
    this.probe = probe;
};

FingerprintMatcher.prototype.match = function(candidate) {
    // Calculate the similarity score of the two fingerprints
    var similarityScore = this.probe.compare(candidate);
    return similarityScore;
};

var fingerprint = "12345ASDFTYI";
var candidate = "Anvith123";

// Create a FingerprintMatcher object
var matcher = new FingerprintMatcher(fingerprint);

document.addEventListener("DOMContentLoaded", function () {
   
    Fingerprint2.get({}, function (components) {
        var fingerprint = Fingerprint2.x64hash128(components.map(function (pair) 
        {
            return pair.value;
        }).join(), 31);

        console.log("Generated Fingerprint:", fingerprint);
    });
});

async function register() {
    try {
      const publicKey = await generatePublicKey();
      const credential = await navigator.credentials.create({ publicKey });

      sendCredentialToServer(credential);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  }

  async function login() {
    try {
      const publicKey = await generatePublicKey();
      const credential = await navigator.credentials.get({ publicKey });

      sendCredentialToServer(credential);
    } catch (error) {
      console.error('Login failed:', error);
    }
  }

  function generatePublicKey() {
    return {
      challenge: new Uint8Array(32), 
      rp: { name: 'Anvith Corp' },
      user: {
        id: new Uint8Array(16), 
        name: 'anvithkrishna01@gmail.com',
        displayName: 'Anvith Krishna'
      },
      pubKeyCredParams: [
        { type: 'public-key', alg: -7 } 
      ],
      authenticatorSelection: { userVerification: 'preferred' },
      timeout: 60000,
      attestation: 'direct'
    };
  }

  function sendCredentialToServer(credential) {
    fetch('/register-or-authenticate-endpoint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ credential }),
    })
    .then(response => {
      if (response.ok) {
        console.log('Credential sent successfully.');
      } else {
        console.error('Failed to send credential to server.');
      }
    })
    .catch(error => console.error('Error sending credential:', error));
  }

 