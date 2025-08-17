'use client';

import { useState } from 'react';
import { PaystackButton } from 'react-paystack';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';

interface PaystackConfig {
  reference: string;
  email: string;
  amount: number;
  publicKey: string;
  text: string;
  onSuccess: (reference: any) => void;
  onClose: () => void;
}

interface FlutterwaveConfig {
  public_key: string;
  tx_ref: string;
  amount: number;
  currency: string;
  payment_options: string;
  customer: {
    email: string;
    phone_number: string;
    name: string;
  };
  customizations: {
    title: string;
    description: string;
    logo: string;
  };
}

interface UserDetails {
  email: string;
  name: string;
  phone: string;
}

export default function BuyStudentSpace() {
  const [studentCount, setStudentCount] = useState(1);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<'paystack' | 'flutterwave'>('paystack');
  const [userDetails, setUserDetails] = useState<UserDetails>({
    email: '',
    name: '',
    phone: ''
  });
  const [errors, setErrors] = useState<Partial<UserDetails>>({});
  
  // Replace with your actual keys
  const paystackPublicKey = "pk_test_5fbc5dde82f43e565cc2a33ee3eea6f7ca26299e";
  const flutterwavePublicKey = "FLWPUBK_TEST-your_flutterwave_public_key";
  
  // Price per student space (in kobo for NGN - multiply by 100)
  const pricePerStudent = 500000; // ₦5,000 in kobo
  
  const totalAmount = studentCount * pricePerStudent;

  const incrementCount = () => {
    setStudentCount(prev => prev + 1);
  };

  const decrementCount = () => {
    setStudentCount(prev => prev > 1 ? prev - 1 : 1);
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<UserDetails> = {};
    
    if (!userDetails.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(userDetails.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!userDetails.name.trim()) {
      newErrors.name = 'Full name is required';
    }
    
    if (!userDetails.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[1-9]\d{1,14}$/.test(userDetails.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Phone number is invalid';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof UserDetails, value: string) => {
    setUserDetails(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleBuyClick = () => {
    if (validateForm()) {
      setShowPayment(true);
    }
  };

  const handleSuccess = (reference: any) => {
    console.log('Payment successful:', reference);
    // Handle successful payment here
    // You might want to:
    // 1. Update user's student space count in your database
    // 2. Show success message
    // 3. Redirect to dashboard
    alert('Payment successful! Student spaces have been added to your account.');
    setShowPayment(false);
    // Reset form after successful payment
    setUserDetails({ email: '', name: '', phone: '' });
    setStudentCount(1);
  };

  const handleClose = () => {
    console.log('Payment closed');
    setShowPayment(false);
  };

  // Paystack configuration
  const paystackConfig: PaystackConfig = {
    reference: `student-space-${Date.now()}`,
    email: userDetails.email,
    amount: totalAmount,
    publicKey: paystackPublicKey,
    text: `Pay ₦${(totalAmount / 100).toLocaleString()}`,
    onSuccess: handleSuccess,
    onClose: handleClose,
  };

  // Flutterwave configuration
  const flutterwaveConfig: FlutterwaveConfig = {
    public_key: flutterwavePublicKey,
    tx_ref: `student-space-${Date.now()}`,
    amount: totalAmount / 100, // Flutterwave uses actual amount, not kobo
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: userDetails.email,
      phone_number: userDetails.phone,
      name: userDetails.name,
    },
    customizations: {
      title: 'Student Space Payment',
      description: `Payment for ${studentCount} student space${studentCount > 1 ? 's' : ''}`,
      logo: 'https://via.placeholder.com/100x100', // Replace with your logo
    },
  };

  const handleFlutterPayment = useFlutterwave(flutterwaveConfig);

  const handleFlutterwavePayment = () => {
    handleFlutterPayment({
      callback: (response) => {
        console.log('Flutterwave payment response:', response);
        if (response.status === 'successful') {
          handleSuccess(response);
        }
        closePaymentModal();
      },
      onClose: () => {
        console.log('Flutterwave payment closed');
        handleClose();
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-8">
          <h1 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Buy Student Spaces
          </h1>
          
          <div className="space-y-6">
            {/* Current Plan Info */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-blue-900 mb-2">
                Current Plan
              </h3>
              <p className="text-blue-700 text-sm">
                Add more student spaces to accommodate additional students
              </p>
            </div>

            {/* User Details Form */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Your Details</h3>
              
              {/* Full Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  value={userDetails.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-600">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  value={userDetails.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your email address"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={userDetails.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="+234 801 234 5678"
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-600">{errors.phone}</p>
                )}
              </div>
            </div>

            {/* Student Counter */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Number of Student Spaces
              </label>
              
              <div className="flex items-center justify-center space-x-4">
                <button
                  onClick={decrementCount}
                  className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-600 font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={studentCount <= 1}
                >
                  −
                </button>
                
                <div className="bg-gray-100 rounded-lg px-4 py-2 min-w-[60px] text-center">
                  <span className="text-xl font-semibold text-gray-900">
                    {studentCount}
                  </span>
                </div>
                
                <button
                  onClick={incrementCount}
                  className="w-10 h-10 rounded-full bg-blue-500 hover:bg-blue-600 flex items-center justify-center text-white font-bold transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Payment Provider Selection */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Payment Method
              </label>
              
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setSelectedProvider('paystack')}
                  className={`p-3 rounded-lg border-2 flex items-center justify-center transition-colors ${
                    selectedProvider === 'paystack'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <div className="text-center">
                    <div className="font-semibold">Paystack</div>
                    <div className="text-xs">Cards, Bank Transfer</div>
                  </div>
                </button>
                
                <button
                  onClick={() => setSelectedProvider('flutterwave')}
                  className={`p-3 rounded-lg border-2 flex items-center justify-center transition-colors ${
                    selectedProvider === 'flutterwave'
                      ? 'border-orange-500 bg-orange-50 text-orange-700'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <div className="text-center">
                    <div className="font-semibold">Flutterwave</div>
                    <div className="text-xs">Cards, Mobile Money</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Price per student space:</span>
                <span>₦{(pricePerStudent / 100).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Number of spaces:</span>
                <span>{studentCount}</span>
              </div>
              <hr className="border-gray-200" />
              <div className="flex justify-between font-semibold text-gray-900">
                <span>Total:</span>
                <span>₦{(totalAmount / 100).toLocaleString()}</span>
              </div>
            </div>

            {/* Buy Button */}
            <button
              onClick={handleBuyClick}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Buy More Student Spaces
            </button>

            {/* Payment Modal/Section */}
            {showPayment && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-lg p-6 w-full max-w-md">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Complete Payment
                  </h3>
                  
                  <div className="space-y-4">
                    {/* Payment Summary */}
                    <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Customer:</span>
                        <span className="font-medium">{userDetails.name}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Email:</span>
                        <span className="font-medium">{userDetails.email}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Phone:</span>
                        <span className="font-medium">{userDetails.phone}</span>
                      </div>
                      <hr className="border-gray-200" />
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          {studentCount} Student Space{studentCount > 1 ? 's' : ''}
                        </span>
                        <span className="text-lg font-semibold text-gray-900">
                          ₦{(totalAmount / 100).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-3">
                      {selectedProvider === 'paystack' ? (
                        <PaystackButton
                          {...paystackConfig}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors"
                        />
                      ) : (
                        <button
                          onClick={handleFlutterwavePayment}
                          className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded transition-colors"
                        >
                          Pay with Flutterwave
                        </button>
                      )}
                      
                      <button
                        onClick={() => setShowPayment(false)}
                        className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}