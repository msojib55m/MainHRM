import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Select from "react-select";
import countryList from "react-select-country-list";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const VendorManager = () => {
    const [vendors, setVendors] = useState([]);
    const [loadingTable, setLoadingTable] = useState(true);
    const [loading, setLoading] = useState(false);

    const [openModal, setOpenModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedVendor, setSelectedVendor] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState(null);

    const countryOptions = useMemo(() => countryList().getData(), []);

    const [formData, setFormData] = useState({
        name: "",
        mobile: "",
        email: "",
        address: "",
        country: "",
        city: "",
        zip: "",
        balance: "",
    });

    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/api/vendors")
            .then((res) => setVendors(res.data))
            .catch((err) => console.error(err))
            .finally(() => setLoadingTable(false));
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCountryChange = (option) => {
        setSelectedCountry(option);
        setFormData({ ...formData, country: option.label });
    };

    const clearForm = () => {
        setFormData({
            name: "",
            mobile: "",
            email: "",
            address: "",
            country: "",
            city: "",
            zip: "",
            balance: "",
        });
        setSelectedCountry(null);
        setSelectedVendor(null);
        setEditMode(false);
    };

    const openAddModal = () => {
        clearForm();
        setOpenModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/vendors",
                formData
            );
            setVendors((prev) => [...prev, response.data.vendor]);
            setOpenModal(false);
            clearForm();
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (vendor) => {
        setEditMode(true);
        setSelectedVendor(vendor);
        setFormData({
            name: vendor.name,
            mobile: vendor.mobile,
            email: vendor.email,
            address: vendor.address,
            country: vendor.country,
            city: vendor.city,
            zip: vendor.zip,
            balance: vendor.balance,
        });
        setSelectedCountry({ label: vendor.country, value: vendor.country });
        setOpenModal(true);
    };

    const handleUpdate = async () => {
        if (!selectedVendor) return;
        setLoading(true);
        try {
            const response = await axios.put(
                `http://127.0.0.1:8000/api/vendors/${selectedVendor.id}`,
                formData
            );
            setVendors((prev) =>
                prev.map((v) =>
                    v.id === selectedVendor.id ? response.data.vendor : v
                )
            );
            setOpenModal(false);
            clearForm();
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4">
            <div className="mb-4">
                <button
                    onClick={openAddModal}
                    className="bg-green-600 text-white px-4 py-2 rounded"
                >
                    + Add Vendor
                </button>
            </div>

            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Mobile</th>
                        <th>Email</th>
                        <th>City</th>
                        <th>Zip</th>
                        <th>Country</th>
                        <th>Balance</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {loadingTable ? (
                        <tr>
                            <td colSpan="9" className="text-center py-4">
                                Loading...
                            </td>
                        </tr>
                    ) : vendors.length === 0 ? (
                        <tr>
                            <td colSpan="9" className="text-center py-4">
                                No vendors found.
                            </td>
                        </tr>
                    ) : (
                        vendors.map((vendor, index) => (
                            <tr key={vendor.id}>
                                <td>{index + 1}</td>
                                <td>{vendor.name}</td>
                                <td>{vendor.mobile}</td>
                                <td>{vendor.email}</td>
                                <td>{vendor.city}</td>
                                <td>{vendor.zip}</td>
                                <td>{vendor.country}</td>
                                <td>{vendor.balance}</td>
                                <td>
                                    <button
                                        onClick={() => handleEdit(vendor)}
                                        className="bg-blue-400 text-white p-1 rounded mx-1"
                                    >
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                    <button className="bg-red-400 text-white p-1 rounded mx-1">
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {/* Modal */}
            {openModal && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 w-[500px] max-w-full shadow-lg relative">
                        <h2 className="text-xl font-bold mb-4">
                            {editMode ? "Edit Vendor" : "Add Vendor"}
                        </h2>
                        <form
                            onSubmit={editMode ? handleUpdate : handleSubmit}
                            className="space-y-3"
                        >
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Name"
                                className="w-full border px-3 py-2 rounded"
                            />
                            <input
                                type="text"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                                placeholder="Mobile"
                                className="w-full border px-3 py-2 rounded"
                            />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email"
                                className="w-full border px-3 py-2 rounded"
                            />
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Address"
                                className="w-full border px-3 py-2 rounded"
                            />
                            <Select
                                options={countryOptions}
                                value={selectedCountry}
                                onChange={handleCountryChange}
                                placeholder="Select Country"
                            />
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                placeholder="City"
                                className="w-full border px-3 py-2 rounded"
                            />
                            <input
                                type="text"
                                name="zip"
                                value={formData.zip}
                                onChange={handleChange}
                                placeholder="ZIP Code"
                                className="w-full border px-3 py-2 rounded"
                            />
                            <input
                                type="number"
                                name="balance"
                                value={formData.balance}
                                onChange={handleChange}
                                placeholder="Balance"
                                className="w-full border px-3 py-2 rounded"
                            />
                            <div className="flex justify-end space-x-2 mt-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setOpenModal(false);
                                        clearForm();
                                    }}
                                    className="bg-gray-400 text-white px-4 py-2 rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-blue-600 text-white px-4 py-2 rounded"
                                >
                                    {loading
                                        ? editMode
                                            ? "Updating..."
                                            : "Saving..."
                                        : editMode
                                        ? "Update"
                                        : "Save"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VendorManager;
