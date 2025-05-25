const InsuranceCompany = require('../model/InsuranceCompany');


getAllCompanies = async (req, res) => {
  try {
    const companies = await InsuranceCompany.find();
    res.status(200).json(companies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


getCompanyById = async (req, res) => {
  try {
    const company = await InsuranceCompany.findById(req.params.id);
    if (!company) return res.status(404).json({ message: 'Company not found' });
    res.status(200).json(company);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


createCompany = async (req, res) => {
  try {
    const newCompany = new InsuranceCompany(req.body);
    const savedCompany = await newCompany.save();
    res.status(201).json(savedCompany);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


 updateCompany = async (req, res) => {
  try {
    const updatedCompany = await InsuranceCompany.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // return updated doc and run schema validators
    );

    if (!updatedCompany) {
      return res.status(404).json({ message: 'Company not found' });
    }

    res.status(200).json(updatedCompany);
  } catch (err) {
    console.error('Update error:', err.message);
    res.status(400).json({ error: err.message });
  }
};

const deleteCompany = async (req, res) => {
  try {
    const id = req.params.id; // assuming you're using req.params.id
    const company = await InsuranceCompany.findByIdAndDelete(id);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    res.status(200).json({ message: "Company deleted successfully" });
  } catch (error) {
    console.error("Error deleting company:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllCompanies,
  createCompany,
  updateCompany,
  deleteCompany
};