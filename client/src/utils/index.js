const formatCertificateName = (certificateType) => {
  // Add your logic to format certificateType as needed
  switch (certificateType) {
    case "zno:history":
      return "ЗНО: Історія";
    case "zno:math":
      return "ЗНО: Математика";
    case "zno:ukrainian":
      return "ЗНО: Українська мова і література";
    case "zno:english":
      return "ЗНО: Англійська мова";
    case "sertificate:school":
      return "Шкільний атестат";
    // Add more cases as needed
    default:
      return certificateType; // Return as is if no match
  }
};

export { formatCertificateName };
