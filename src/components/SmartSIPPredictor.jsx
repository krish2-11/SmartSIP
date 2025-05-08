import { useState } from 'react';

export default function SmartSIPPredictor() {
  const [formData, setFormData] = useState({
    age: '',
    monthlyIncome: '',
    riskAppetite: 'Medium',
    timeHorizon: '',
    investmentGoal: 'Wealth Creation'
  });
  
  const [result, setResult] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    
    if (!formData.age || !formData.monthlyIncome || !formData.timeHorizon) {
      alert("Please fill all required fields");
      return;
    }
  };
  
  const resetForm = () => {
    setFormData({
      age: '',
      monthlyIncome: '',
      riskAppetite: 'Medium',
      timeHorizon: '',
      investmentGoal: 'Wealth Creation'
    });
    setFormSubmitted(false);
    setResult(null);
  };
  
  
  return (
    <div className="min-h-screen bg-indigo-600 py-8 bg-gradient-to-b bg-blue-700 to-violet-500">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden md:max-w-2xl border border-blue-100">
      <div className="p-8 transition transform hover:shadow-2xl hover:scale-[1.01] duration-300 hover:border-indigo-300">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-blue-700">SmartSIP Predictor</h1>
            <p className="text-gray-700 mt-2">Get personalized SIP investment recommendations</p>
          </div>
          
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Age *</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-blue-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your age"
                  min="18"
                  max="100"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Monthly Income (₹) *</label>
                <input
                  type="number"
                  name="monthlyIncome"
                  value={formData.monthlyIncome}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-blue-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter your monthly income"
                  min="10000"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Risk Appetite *</label>
                <select
                  name="riskAppetite"
                  value={formData.riskAppetite}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-blue-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Time Horizon (years) *</label>
                <input
                  type="number"
                  name="timeHorizon"
                  value={formData.timeHorizon}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-blue-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter investment time horizon"
                  min="1"
                  max="30"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Investment Goal *</label>
                <select
                  name="investmentGoal"
                  value={formData.investmentGoal}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-blue-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="Wealth Creation">Wealth Creation</option>
                  <option value="Tax Saving">Tax Saving</option>
                  <option value="Retirement">Retirement</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div className="flex justify-end gap-2">
                <button
                  onClick={handleSubmit}
                  className="w-body flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Get Recommendations
                </button>
              
                <button
                  onClick={resetForm}
                  className="w-body flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Reset
                </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}