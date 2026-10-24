const image = document.getElementById("dog-image");
const statusText = document.getElementById("status-code");
const button = document.getElementById("generate-btn");
const message = document.getElementById("message");

const dogs = [
  { code: 200, name: "OK" },
  { code: 201, name: "Created" },
  { code: 202, name: "Accepted" },
  { code: 204, name: "No Content" },
  { code: 205, name: "Reset Content" },
  { code: 301, name: "Moved Permanently" },
  { code: 400, name: "Bad Request" },
  { code: 401, name: "Unauthorized" },
  { code: 403, name: "Forbidden" },
  { code: 404, name: "Not Found" },
  { code: 418, name: "I'm a Teapot" },
  { code: 429, name: "Too Many Requests" },
  { code: 500, name: "Internal Server Error" },
  { code: 502, name: "Bad Gateway" },
  { code: 503, name: "Service Unavailable" }
];

let currentCode = null;

// Load a dog image for the selected HTTP status code.
async function loadDog(dog) {
  button.disabled = true;
  message.textContent = "Loading a new dog... 🐾";

  try {
    const newImage = new Image();

    await new Promise((resolve, reject) => {
      newImage.onload = resolve;
      newImage.onerror = reject;
      newImage.src = `https://http.dog/${dog.code}.jpg`;
    });

    image.src = newImage.src;
    image.alt = `Dog image for HTTP ${dog.code}`;

    statusText.textContent = `HTTP ${dog.code} — ${dog.name}`;
    message.textContent = "";
    currentCode = dog.code;
  } catch (error) {
    message.textContent =
      "Image load aagala! Please try another dog.";
  } finally {
    button.disabled = false;
  }
}

// Choose a different status code each time.
function generateDog() {
  const options = dogs.filter(
    dog => dog.code !== currentCode
  );

  const randomIndex = Math.floor(
    Math.random() * options.length
  );

  loadDog(options[randomIndex]);
}

button.addEventListener("click", generateDog);

// Display the initial dog image.
loadDog(dogs.find(dog => dog.code === 201));
