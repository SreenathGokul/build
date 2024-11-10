class GetDesign {
  constructor() {
    this.images = []; // Use an array to store multiple images
  }

  async getDesign(event) {
    event.preventDefault(); // Prevent form submission and page reload

    // Get values from the form
    const squareFeet = document.getElementById("square-feet").value;
    const floor = document.getElementById("floors").value;
    const facing = document.getElementById("facing").value;

    // Check if values are selected
    if (!squareFeet || !floor || !facing) {
      alert("All fields are required");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/getDesign", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          squareFeet: squareFeet,
          floor: floor,
          facing: facing,
        }),
      });

      const data = await response.json();
      if (data.length > 0) {
        // Store the image URLs in localStorage as a JSON string
        localStorage.setItem(
          "designImages",
          JSON.stringify(data.map((item) => item.image))
        );
        // Redirect to new page to display the images
        window.location.href = "design.html";
      } else {
        alert("No design found for the selected options");
      }
    } catch (error) {
      console.error("Error fetching design:", error);
    }
  }
}

// Instantiate the class and bind the form submit event
const design = new GetDesign();
document
  .querySelector(".getDesign")
  .addEventListener("submit", (event) => design.getDesign(event));
