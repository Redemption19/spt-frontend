import { z } from "zod";

export const employerEnrollmentSchema = z.object({
  // Scheme Selection
  schemeName: z.enum(["Best Master Trust", "Best Provident Fund", "Best Personal Pension"], {
    required_error: "Please select a scheme name"
  }),
  schemeType: z.enum(["Tier 2", "Tier 3"], {
    required_error: "Please select a scheme type"
  }),

  // EMPLOYER PARTICULARS
  employerName: z.string().min(2, "Name of Employer is required"),
  mailingAddress: z.string().min(10, "Mailing Address is required"),
  businessRegistrationNo: z.string().min(2, "Business Registration No. is required"),
  email: z.string().email("Please enter a valid email address"),
  ssnitEmployerNo: z.string().min(2, "SSNIT Employer No. is required"),
  fixedLines: z.string().min(10, "Fixed Lines are required"),
  businessLocation: z.string().min(2, "Business Location is required"),
  gpsAddress: z.string().min(2, "GPS Address is required"),
  industryCategory: z.string().min(2, "Industry Category is required"),
  tin: z.string().min(2, "TIN is required"),

  // CONTACT PERSON (One Director and two others)
  // Director
  directorName: z.string().min(2, "Director name is required"),
  directorEmail: z.string().email("Please enter a valid email address"),
  directorPhone: z.string().min(10, "Director phone is required"),
  directorPosition: z.string().min(2, "Director position is required"),

  // Contact Person 1
  contact1Name: z.string().min(2, "Contact person 1 name is required"),
  contact1Email: z.string().email("Please enter a valid email address"),
  contact1Phone: z.string().min(10, "Contact person 1 phone is required"),
  contact1Position: z.string().min(2, "Contact person 1 position is required"),

  // Contact Person 2
  contact2Name: z.string().min(2, "Contact person 2 name is required"),
  contact2Email: z.string().email("Please enter a valid email address"),
  contact2Phone: z.string().min(10, "Contact person 2 phone is required"),
  contact2Position: z.string().min(2, "Contact person 2 position is required"),

  // CONTRIBUTION DETAILS
  numberOfEmployees: z.coerce.number().min(1, "Number of employees is required"),
  totalContributionAtRegistration: z.coerce.number().min(0, "Total 5% contribution at registration is required"),

  // PREVIOUS INFORMATION
  nameOfPreviousScheme: z.string().optional(),
  nameOfPreviousTrustee: z.string().optional(),

  // Declaration Section
  representativeOf: z.string().min(2, "Representative of field is required"),
  declarationAgreed: z.boolean().refine(val => val === true, {
    message: "You must declare and certify that the information given is accurate and true"
  }),
  signature: z.string().min(2, "Signature is required"),
  designation: z.string().min(2, "Designation is required"),
  dateOfSignature: z.string().min(1, "Date is required"),

  // FOR OFFICE USE ONLY
  inputOfficer: z.string().optional(),
  inputDate: z.string().optional(),
  authorizingOfficer: z.string().optional(),
  authorizingDate: z.string().optional(),
});
