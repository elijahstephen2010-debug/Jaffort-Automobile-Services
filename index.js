
const WHATSAPP_NUMBER = "2348033942685";

const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");

menuToggle.addEventListener("click", () => {
    navbar.classList.toggle("show");

    const icon = menuToggle.querySelector("i");
    icon.classList.toggle("fa-bars");
    icon.classList.toggle("fa-xmark");
});

document.querySelectorAll(".navbar a").forEach(link => {
    link.addEventListener("click", () => {
        navbar.classList.remove("show");

        const icon = menuToggle.querySelector("i");
        icon.classList.add("fa-bars");
        icon.classList.remove("fa-xmark");
    });
});

document.getElementById("currentYear").textContent = new Date().getFullYear();

const dateInput = document.getElementById("appointmentDate");
const today = new Date();
const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
    .toISOString().split("T")[0];

dateInput.min = localToday;

function sendWhatsApp(message) {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
}

// Select a service directly from the service cards
document.querySelectorAll("[data-service]").forEach(link => {
    link.addEventListener("click", () => {
        document.getElementById("serviceType").value = link.dataset.service;
    });
});

// Appointment request
document.getElementById("bookingForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("customerName").value.trim();
    const phone = document.getElementById("customerPhone").value.trim();
    const make = document.getElementById("vehicleMake").value.trim();
    const model = document.getElementById("vehicleModel").value.trim();
    const year = document.getElementById("vehicleYear").value.trim();
    const service = document.getElementById("serviceType").value;
    const date = document.getElementById("appointmentDate").value;
    const time = document.getElementById("appointmentTime").value;
    const issue = document.getElementById("vehicleIssue").value.trim();

    if (!name || !phone || !make || !model || !service || !date || !time) {
        alert("Please complete all required appointment fields.");
        return;
    }

    if (date < localToday) {
        alert("Please select a future appointment date.");
        return;
    }

    const message = `
JAFORT SYSTEMS - APPOINTMENT REQUEST

Customer: ${name}
Phone: ${phone}

Vehicle: ${make} ${model}
Year: ${year || "Not specified"}

Service Required: ${service}
Preferred Date: ${date}
Preferred Time: ${time}

Additional Details:
${issue || "No additional details supplied."}

Please confirm the appointment.
    `;

    sendWhatsApp(message);
});

// Spare parts catalogue
const parts = [
    {
        name: "Brake Pad Set",
        category: "Brake",
        description: "Brake system replacement component.",
        icon: "fa-circle-stop"
    },
    {
        name: "Engine Air Filter",
        category: "Filters",
        description: "Air filtration component for your engine.",
        icon: "fa-filter"
    },
    {
        name: "Oil Filter",
        category: "Filters",
        description: "Engine oil filtration component.",
        icon: "fa-oil-can"
    },
    {
        name: "Spark Plug Set",
        category: "Engine",
        description: "Ignition components for petrol engines.",
        icon: "fa-bolt"
    },
    {
        name: "Car Battery",
        category: "Electrical",
        description: "Vehicle electrical power component.",
        icon: "fa-car-battery"
    },
    {
        name: "LED Headlight",
        category: "Electrical",
        description: "Automotive lighting component.",
        icon: "fa-lightbulb"
    },
    {
        name: "Shock Absorber",
        category: "Suspension",
        description: "Suspension and ride-control component.",
        icon: "fa-car-side"
    },
    {
        name: "Engine Belt",
        category: "Engine",
        description: "Engine drive belt component.",
        icon: "fa-gears"
    }
];

const partsGrid = document.getElementById("partsGrid");
const partSearch = document.getElementById("partSearch");
const partCategory = document.getElementById("partCategory");

function renderParts() {
    const search = partSearch.value.toLowerCase().trim();
    const category = partCategory.value;

    const filtered = parts.filter(part => {
        const matchesSearch =
            part.name.toLowerCase().includes(search) ||
            part.category.toLowerCase().includes(search) ||
            part.description.toLowerCase().includes(search);

        const matchesCategory =
            category === "all" || part.category === category;

        return matchesSearch && matchesCategory;
    });

    if (!filtered.length) {
        partsGrid.innerHTML = `<div class="no-results">No matching spare parts found. Contact us to request a specific part.</div>`;
        return;
    }

    partsGrid.innerHTML = filtered.map(part => `
        <article class="part-card">
            <div class="part-image">
                <span>${part.category}</span>
                <i class="fas ${part.icon}"></i>
            </div>
            <div class="part-info">
                <small>${part.category} COMPONENT</small>
                <h3>${part.name}</h3>
                <p>${part.description}</p>
                <div class="part-footer">
                    <strong>Price on enquiry</strong>
                    <button type="button" onclick="requestPart('${part.name}')">
                        Enquire <i class="fas fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        </article>
    `).join("");
}

function requestPart(partName) {
    const message = `
JAFORT SYSTEMS - SPARE PART ENQUIRY

Hello, I am interested in:
${partName}

Please provide availability, price and delivery information.

My vehicle details:
Make:
Model:
Year:
    `;

    sendWhatsApp(message);
}

partSearch.addEventListener("input", renderParts);
partCategory.addEventListener("change", renderParts);

renderParts();

// Contact form
document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("contactName").value.trim();
    const phone = document.getElementById("contactPhone").value.trim();
    const messageText = document.getElementById("contactMessage").value.trim();

    if (!name || !phone || !messageText) {
        alert("Please complete all contact fields.");
        return;
    }

    const message = `
JAFORT SYSTEMS - GENERAL ENQUIRY

Name: ${name}
Phone: ${phone}

Message:
${messageText}
    `;

    sendWhatsApp(message);
});
