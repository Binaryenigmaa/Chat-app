const FormField = ({ id, label, type, onChange }) => (
  <div className=" flex flex-col m-2">
    <label htmlFor={id} className="block text-sm font-medium text-gray-300">
      {label}
    </label>
    <input
      id={id}
      name={id}
      type={type}
      onChange={onChange}
      required
      className="w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
    />
  </div>
);

export default FormField;
