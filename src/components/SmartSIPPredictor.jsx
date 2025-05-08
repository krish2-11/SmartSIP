import { useState } from 'react';

function SIPRecommendations({ recommendations, onBack }) {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? "text-yellow-400" : "text-gray-400"}>★</span>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="space-y-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Your Personalized SIP Recommendations</h2>
            <p className="text-gray-600 mt-2">Optimized for your financial profile and goals</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {recommendations?.map((fund, index) => (
              <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{fund['Fund Name']}</h3>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    {fund.Category}
                  </span>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Rating:</span>
                    <span className="text-yellow-500">{renderStars(fund.Rating)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">1Y Returns:</span>
                    <span className="text-green-600">{fund['1 Year Return']}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">3Y Returns:</span>
                    <span className="text-blue-600">{fund['3 Year Return']}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">NAV:</span>
                    <span className="text-gray-900">₹{fund.NAV}</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100">
                  <button className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-4 mt-12">
            <button
              onClick={onBack}
              className="py-3 px-8 rounded-lg text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transition-all"
            >
              Modify Search
            </button>
            <button className="py-3 px-8 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all">
              Download Report (PDF)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SmartSIPPredictor() {
  const [formData, setFormData] = useState({
    age: '',
    monthlyIncome: '',
    riskAppetite: 'Medium',
    timeHorizon: '',
    investmentGoal: 'Wealth Creation'
  });

  const [result, setResult] = useState(null);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSliderChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.age || !formData.monthlyIncome || !formData.timeHorizon) {
      alert("Please fill all required fields");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const mockOutput = {
        top_suggestions: [
          {
            "1 Year Return": 25.52,
            "3 Year Return": 15.27,
            "AUM": 5865.8,
            "Category": "Hybrid",
            "Fund Name": "SBI Multi Asset Allocation-G",
            "Model Score": 20.457,
            "NAV": 56.47,
            "Rating": 4
          },
          {
            "1 Year Return": 25.18,
            "3 Year Return": 12.8,
            "AUM": 449.96,
            "Category": "Hybrid",
            "Fund Name": "HSBC Equity Savings-G",
            "Model Score": 20.381,
            "NAV": 32.62,
            "Rating": 5
          },
          {
            "1 Year Return": 25.84,
            "3 Year Return": 13.97,
            "AUM": 4111.83,
            "Category": "Hybrid",
            "Fund Name": "Baroda BNP Paribas Balanced Advantage Reg-G",
            "Model Score": 19.872,
            "NAV": 23.82,
            "Rating": 4
          }
        ]
      };

      setResult(mockOutput);
      setShowRecommendations(true);
      setLoading(false);
    }, 1500);
  };

  const resetForm = () => {
    setFormData({
      age: '',
      monthlyIncome: '',
      riskAppetite: 'Medium',
      timeHorizon: '',
      investmentGoal: 'Wealth Creation'
    });
    setShowRecommendations(false);
    setResult(null);
  };

  const calculateProgress = () => {
    let filledFields = 0;
    const totalFields = 5;
    if (formData.age) filledFields++;
    if (formData.monthlyIncome) filledFields++;
    if (formData.riskAppetite) filledFields++;
    if (formData.timeHorizon) filledFields++;
    if (formData.investmentGoal) filledFields++;
    return (filledFields / totalFields) * 100;
  };

  return (
    <>
      {showRecommendations ? (
        <SIPRecommendations 
          recommendations={result?.top_suggestions} 
          onBack={resetForm}
        />
      ) : (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-8">
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-900">SmartSIP Predictor</h1>
                <p className="text-gray-600 mt-2">Discover personalized mutual fund SIP recommendations tailored to your financial goals</p>
              </div>

              <div>
                <div className="mb-6">
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${calculateProgress()}%` }}></div>
                  </div>
                  <p className="text-xs text-gray-600 text-right">{Math.round(calculateProgress())}% Complete</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Age Input */}
                    <div className="bg-gray-50 p-5 rounded-xl">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Age <span className="text-red-500">*</span></label>
                      <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 bg-white shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        placeholder="Enter your age"
                        min="18"
                        max="100"
                      />
                      <p className="text-xs text-gray-500 mt-1">Must be between 18-100 years</p>
                    </div>

                    {/* Monthly Income Input */}
                    <div className="bg-gray-50 p-5 rounded-xl">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Income (₹) <span className="text-red-500">*</span></label>
                      <input
                        type="number"
                        name="monthlyIncome"
                        value={formData.monthlyIncome}
                        onChange={handleChange}
                        className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 bg-white shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        placeholder="Enter your monthly income"
                        min="10000"
                      />
                      <p className="text-xs text-gray-500 mt-1">Minimum ₹10,000</p>
                    </div>

                    {/* Risk Appetite Selector */}
                    <div className="bg-gray-50 p-5 rounded-xl">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Risk Appetite <span className="text-red-500">*</span></label>
                      <div className="mt-2 grid grid-cols-3 gap-2">
                        {['Low', 'Medium', 'High'].map((risk) => (
                          <button
                            key={risk}
                            type="button"
                            onClick={() => handleSliderChange('riskAppetite', risk)}
                            className={`py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                              formData.riskAppetite === risk 
                                ? 'bg-blue-600 text-white shadow-lg' 
                                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            {risk}
                          </button>
                        ))}
                      </div>
                      <p className="text-xs text-gray-500 mt-3">
                        {formData.riskAppetite === 'Low' && 'Conservative approach with stable returns'}
                        {formData.riskAppetite === 'Medium' && 'Balanced approach with moderate risk'}
                        {formData.riskAppetite === 'High' && 'Aggressive approach with higher potential returns'}
                      </p>
                    </div>

                    {/* Time Horizon Input */}
                    <div className="bg-gray-50 p-5 rounded-xl">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Time Horizon (years) <span className="text-red-500">*</span></label>
                      <input
                        type="number"
                        name="timeHorizon"
                        value={formData.timeHorizon}
                        onChange={handleChange}
                        className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 bg-white shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        placeholder="Enter investment time horizon"
                        min="1"
                        max="30"
                      />
                      <p className="text-xs text-gray-500 mt-1">Between 1-30 years</p>
                    </div>

                    {/* Investment Goal Selector */}
                    <div className="bg-gray-50 p-5 rounded-xl md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Investment Goal <span className="text-red-500">*</span></label>
                      <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-3">
                        {['Wealth Creation', 'Tax Saving', 'Retirement', 'Other'].map((goal) => (
                          <button
                            key={goal}
                            type="button"
                            onClick={() => handleSliderChange('investmentGoal', goal)}
                            className={`py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                              formData.investmentGoal === goal 
                                ? 'bg-blue-600 text-white shadow-lg transform scale-105' 
                                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            {goal}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Form Actions */}
                  <div className="flex justify-end gap-3 pt-4">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="py-3 px-6 rounded-lg text-gray-700 border border-gray-300 hover:bg-gray-50 transition-all"
                    >
                      Reset
                    </button>
                    <button
                      type="submit"
                      className="py-3 px-8 rounded-lg text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-lg transition-all"
                    >
                      {loading ? 'Analyzing...' : 'Get Recommendations'}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="text-center mt-6 text-xs text-gray-500">
              © 2025 SmartSIP Predictor | Disclaimer: Past performance is not indicative of future returns
            </div>
          </div>
        </div>
      )}
    </>
  );
}