'use client';

import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import Image from 'next/image';

const JosaaHelpForm = () => {
  // Form field states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('');
  const [pwdBenchmark, setPwdBenchmark] = useState(false);
  const [gender, setGender] = useState('');
  const [rankType, setRankType] = useState('');
  const [crlRankMain, setCrlRankMain] = useState('');
  const [catRankMain, setCatRankMain] = useState('');
  const [crlRankAdvanced, setCrlRankAdvanced] = useState('');
  const [catRankAdvanced, setCatRankAdvanced] = useState('');
  const [homeState, setHomeState] = useState('');
  const [homeStateOther, setHomeStateOther] = useState('');
  const [questions, setQuestions] = useState('');

  // File states
  const [scorecardMain, setScorecardMain] = useState<File | null>(null);
  const [scorecardAdvanced, setScorecardAdvanced] = useState<File | null>(null);
  const [paymentReceipt, setPaymentReceipt] = useState<File | null>(null);

  // Error states
  const [fullNameError, setFullNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [crlMainError, setCrlMainError] = useState('');
  const [catMainError, setCatMainError] = useState('');
  const [crlAdvError, setCrlAdvError] = useState('');
  const [catAdvError, setCatAdvError] = useState('');
  const [homeStateOtherError, setHomeStateOtherError] = useState('');

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Validation regexes
  const nameRegex = /^[A-Za-z ]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{10}$/;

  // Real-time validation handlers
  const validateFullName = (value: string) => {
    if (!value.trim()) {
      setFullNameError('Full Name is required.');
    } else if (!nameRegex.test(value.trim())) {
      setFullNameError('Name can contain only letters and spaces.');
    } else {
      setFullNameError('');
    }
  };

useEffect(() => {
    // Initialize EmailJS with your public key
    emailjs.init('_COlWtMk04vHkowPi');
  }, [fullName, email]);


  const validateEmail = (value: string) => {
    if (!value.trim()) {
      setEmailError('Email is required.');
    } else if (!emailRegex.test(value.trim())) {
      setEmailError('Enter a valid email address.');
    } else {
      setEmailError('');
    }
  };

  const validatePhone = (value: string) => {
    if (!value.trim()) {
      setPhoneError('Phone number is required.');
    } else if (!phoneRegex.test(value.trim())) {
      setPhoneError('Phone number must be exactly 10 digits.');
    } else {
      setPhoneError('');
    }
  };

  const validateCrlCatMain = (crl: string, cat: string) => {
    if (!crl.trim()) {
      setCrlMainError('CRL Rank is required.');
    } else if (Number(crl) < 1) {
      setCrlMainError('Rank must be ≥ 1.');
    } else if (category !== 'GEN' && cat.trim()) {
      if (Number(crl) < Number(cat)) {
        setCrlMainError('CRL ≥ Category rank.');
      } else {
        setCrlMainError('');
      }
    } else {
      setCrlMainError('');
    }

    if (category !== 'GEN') {
      if (!cat.trim()) {
        setCatMainError('Category Rank is required.');
      } else if (Number(cat) < 1) {
        setCatMainError('Rank must be ≥ 1.');
      } else if (crl.trim() && Number(crl) < Number(cat)) {
        setCatMainError('Category ≤ CRL rank.');
      } else {
        setCatMainError('');
      }
    } else {
      setCatMainError('');
    }
  };

  const validateCrlCatAdv = (crl: string, cat: string) => {
    if (!crl.trim()) {
      setCrlAdvError('CRL Rank is required.');
    } else if (Number(crl) < 1) {
      setCrlAdvError('Rank must be ≥ 1.');
    } else if (category !== 'GEN' && cat.trim()) {
      if (Number(crl) < Number(cat)) {
        setCrlAdvError('CRL ≥ Category rank.');
      } else {
        setCrlAdvError('');
      }
    } else {
      setCrlAdvError('');
    }

    if (category !== 'GEN') {
      if (!cat.trim()) {
        setCatAdvError('Category Rank is required.');
      } else if (Number(cat) < 1) {
        setCatAdvError('Rank must be ≥ 1.');
      } else if (crl.trim() && Number(crl) < Number(cat)) {
        setCatAdvError('Category ≤ CRL rank.');
      } else {
        setCatAdvError('');
      }
    } else {
      setCatAdvError('');
    }
  };

  const validateHomeStateOther = (value: string) => {
    if (homeState === 'Other' && !value.trim()) {
      setHomeStateOtherError('Please specify your home state.');
    } else {
      setHomeStateOtherError('');
    }
  };

  // Re-validate when category or rankType changes
  useEffect(() => {
    if (rankType === 'JEE Main') {
      validateCrlCatMain(crlRankMain, catRankMain);
    } else if (rankType === 'JEE Advanced') {
      validateCrlCatMain(crlRankMain, catRankMain);
      validateCrlCatAdv(crlRankAdvanced, catRankAdvanced);
    }
  }, [category, rankType]);

  // Cloudinary upload helper
  const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'JoSAA_upload');
    const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/auto/upload`, {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    return data.secure_url;
  };

  // Reset all fields
  const resetForm = () => {
    setFullName('');
    setEmail('');
    setPhone('');
    setCategory('');
    setPwdBenchmark(false);
    setGender('');
    setRankType('');
    setCrlRankMain('');
    setCatRankMain('');
    setCrlRankAdvanced('');
    setCatRankAdvanced('');
    setHomeState('');
    setHomeStateOther('');
    setQuestions('');
    setScorecardMain(null);
    setScorecardAdvanced(null);
    setPaymentReceipt(null);

    setFullNameError('');
    setEmailError('');
    setPhoneError('');
    setCrlMainError('');
    setCatMainError('');
    setCrlAdvError('');
    setCatAdvError('');
    setHomeStateOtherError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    //emailjs initiation
      

    // Final validation

    validateFullName(fullName);
    validateEmail(email);
    validatePhone(phone);
    validateHomeStateOther(homeStateOther);

    if (!fullName.trim() || fullNameError) {
      setIsSubmitting(false);
      return;
    }
    if (!email.trim() || emailError) {
      setIsSubmitting(false);
      return;
    }
    if (!phone.trim() || phoneError) {
      setIsSubmitting(false);
      return;
    }
    if (!category) {
      alert('Please select your Category.');
      setIsSubmitting(false);
      return;
    }
    if (!gender) {
      alert('Please select your Gender.');
      setIsSubmitting(false);
      return;
    }
    if (!rankType) {
      alert('Please select Rank Type.');
      setIsSubmitting(false);
      return;
    }
    if (!homeState) {
      alert('Please select Home State.');
      setIsSubmitting(false);
      return;
    }
    if (homeState === 'Other' && homeStateOtherError) {
      setIsSubmitting(false);
      return;
    }

    // Rank validation
    if (rankType === 'JEE Main') {
      validateCrlCatMain(crlRankMain, catRankMain);
      if (!crlRankMain.trim() || crlMainError) {
        setIsSubmitting(false);
        return;
      }
      if (category !== 'GEN' && (!catRankMain.trim() || catMainError)) {
        setIsSubmitting(false);
        return;
      }
    }

    if (rankType === 'JEE Advanced') {
      validateCrlCatMain(crlRankMain, catRankMain);
      validateCrlCatAdv(crlRankAdvanced, catRankAdvanced);
      if (
        !crlRankMain.trim() ||
        crlMainError ||
        (category !== 'GEN' && catMainError)
      ) {
        setIsSubmitting(false);
        return;
      }
      if (
        !crlRankAdvanced.trim() ||
        crlAdvError ||
        (category !== 'GEN' && catAdvError)
      ) {
        setIsSubmitting(false);
        return;
      }
    }

    // File presence
    if (rankType === 'JEE Main' && !scorecardMain) {
      alert('Please upload your JEE Main scorecard.');
      setIsSubmitting(false);
      return;
    }
    if (rankType === 'JEE Advanced' && (!scorecardMain || !scorecardAdvanced)) {
      alert('Please upload both JEE Main and JEE Advanced scorecards.');
      setIsSubmitting(false);
      return;
    }
    if (!paymentReceipt) {
      alert('Please upload your Payment Receipt.');
      setIsSubmitting(false);
      return;
    }

    try {
      // Upload files to Cloudinary
      const mainScorecardUrl = await uploadToCloudinary(scorecardMain!);
      const advScorecardUrl =
        rankType === 'JEE Advanced' ? await uploadToCloudinary(scorecardAdvanced!) : '';
      const receiptUrl = await uploadToCloudinary(paymentReceipt!);

      // Build payload for SheetDB
      const payload = {
        fullName,
        email,
        phone,
        category,
        pwdBenchmark,
        gender,
        rankType,
        homeState,
        homeStateOther: homeState === 'Other' ? homeStateOther : '',
        crlRankMain:
          rankType === 'JEE Main' || rankType === 'JEE Advanced'
            ? crlRankMain
            : '',
        catRankMain:
          (rankType === 'JEE Main' || rankType === 'JEE Advanced') &&
          category !== 'GEN'
            ? catRankMain
            : '',
        crlRankAdvanced: rankType === 'JEE Advanced' ? crlRankAdvanced : '',
        catRankAdvanced:
          rankType === 'JEE Advanced' && category !== 'GEN'
            ? catRankAdvanced
            : '',
        questions,
        mainScorecardUrl,
        advScorecardUrl,
        receiptUrl,
      };

      // Submit to SheetDB
      const sheetRes = await fetch(`${process.env.NEXT_PUBLIC_SHEET_DB}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: payload }),
      });
      if (!sheetRes.ok) {
        const errText = await sheetRes.text();
        throw new Error(`SheetDB submission failed: ${errText}`);
      }


      
      // Send confirmation email via EmailJS
      emailjs.send(
          `${process.env.NEXT_PUBLIC_SERVICE_ID}`,
          `${process.env.NEXT_PUBLIC_TEMPLATE_ID}`,
          {
            to_email: email,
            to_name: fullName,
            message: 'Thank you for submitting. We will be back to you within 12 hours.',
            subject: "You are one step closer to get the admission you deserve"
          },
          `${process.env.NEXT_PUBLIC_USER_ID}`
        )
        .catch((emailErr) => {
          console.error('EmailJS error:', emailErr);
        });

        
      setIsSubmitted(true);
      resetForm();
    } catch (error: unknown) {
  if (error instanceof Error) {
    alert(`Submission failed: ${error.message}`);
    console.error(error);
  } else {
    alert('Submission failed: Unknown error');
    console.error('Unknown error:', error);
  }
}
finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <div className="bg-white p-10 rounded-xl shadow-lg text-center max-w-md w-full">
          <h2 className="text-3xl font-bold text-green-600 mb-4">Thank You!</h2>
          <p className="text-gray-600 mb-6">
            Your submission has been received successfully.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition cursor-pointer"
          >
            Submit Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl bg-white p-10 rounded-2xl shadow-xl grid gap-6"
        noValidate
      >
        {/* Title */}
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">
          JoSAA Student Help Form
        </h1>
        <p className="text-center text-gray-500 mb-4">
          Complete all required fields and upload necessary documents
        </p>

        {/* Full Name */}
        <div>
          <label className="block mb-1 text-gray-700">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
              validateFullName(e.target.value);
            }}
            className={`w-full p-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
              fullNameError ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your full name"
            required
          />
          {fullNameError && (
            <p className="text-red-500 text-sm mt-1">{fullNameError}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 text-gray-700">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              validateEmail(e.target.value);
            }}
            className={`w-full p-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
              emailError ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter a valid email address"
            required
          />
          {emailError && (
            <p className="text-red-500 text-sm mt-1">{emailError}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block mb-1 text-gray-700">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              validatePhone(e.target.value);
            }}
            className={`w-full p-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
              phoneError ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="10-digit phone number"
            required
          />
          {phoneError && (
            <p className="text-red-500 text-sm mt-1">{phoneError}</p>
          )}
        </div>

        {/* Category & PWD */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 text-gray-700">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            >
              <option value="">Select Category</option>
              <option value="GEN">GEN</option>
              <option value="OBC">OBC</option>
              <option value="SC">SC</option>
              <option value="ST">ST</option>
              <option value="EWS">EWS</option>
            </select>
          </div>
          <label className="flex items-center space-x-2 mt-6">
            <input
              type="checkbox"
              checked={pwdBenchmark}
              onChange={() => setPwdBenchmark((prev) => !prev)}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded cursor-pointer"
            />
            <span className="text-gray-700">
              Person with Benchmark Disability (≥ 40%)
            </span>
          </label>
        </div>

        {/* Gender */}
        <div>
          <label className="block mb-1 text-gray-700">
            Gender <span className="text-red-500">*</span>
          </label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Transgender">Transgender</option>
          </select>
        </div>

        {/* Rank Type */}
        <div>
          <label className="block mb-1 text-gray-700">
            Rank Type <span className="text-red-500">*</span>
          </label>
          <select
            value={rankType}
            onChange={(e) => setRankType(e.target.value)}
            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          >
            <option value="">Select Rank Type</option>
            <option value="JEE Main">JEE Main</option>
            <option value="JEE Advanced">JEE Advanced</option>
          </select>
        </div>

        {/* CRL & Category Rank (JEE Main) */}
        {(rankType === 'JEE Main' || rankType === 'JEE Advanced') && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-1 text-gray-700">
                CRL Rank (JEE Main) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={crlRankMain}
                onChange={(e) => {
                  setCrlRankMain(e.target.value);
                  validateCrlCatMain(e.target.value, catRankMain);
                }}
                className={`w-full p-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                  crlMainError ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your CRL rank in JEE Main"
                required
                min={1}
              />
              {crlMainError && (
                <p className="text-red-500 text-sm mt-1">{crlMainError}</p>
              )}
            </div>
            {category !== 'GEN' && (
              <div>
                <label className="block mb-1 text-gray-700">
                  Category Rank (JEE Main) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={catRankMain}
                  onChange={(e) => {
                    setCatRankMain(e.target.value);
                    validateCrlCatMain(crlRankMain, e.target.value);
                  }}
                  className={`w-full p-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                    catMainError ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your category rank in JEE Main"
                  required
                  min={1}
                />
                {catMainError && (
                  <p className="text-red-500 text-sm mt-1">{catMainError}</p>
                )}
              </div>
            )}
          </div>
        )}

        {/* CRL & Category Rank (JEE Advanced) */}
        {rankType === 'JEE Advanced' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-1 text-gray-700">
                CRL Rank (JEE Advanced) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={crlRankAdvanced}
                onChange={(e) => {
                  setCrlRankAdvanced(e.target.value);
                  validateCrlCatAdv(e.target.value, catRankAdvanced);
                }}
                className={`w-full p-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                  crlAdvError ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your CRL rank in JEE Advanced"
                required
                min={1}
              />
              {crlAdvError && (
                <p className="text-red-500 text-sm mt-1">{crlAdvError}</p>
              )}
            </div>
            {category !== 'GEN' && (
              <div>
                <label className="block mb-1 text-gray-700">
                  Category Rank (JEE Advanced) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={catRankAdvanced}
                  onChange={(e) => {
                    setCatRankAdvanced(e.target.value);
                    validateCrlCatAdv(crlRankAdvanced, e.target.value);
                  }}
                  className={`w-full p-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                    catAdvError ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your category rank in JEE Advanced"
                  required
                  min={1}
                />
                {catAdvError && (
                  <p className="text-red-500 text-sm mt-1">{catAdvError}</p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Home State */}
        <div>
          <label className="block mb-1 text-gray-700">
            Home State (where you gave 12th exam) <span className="text-red-500">*</span>
          </label>
          <select
            value={homeState}
            onChange={(e) => {
              setHomeState(e.target.value);
              setHomeStateOther('');
              setHomeStateOtherError('');
            }}
            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          >
            <option value="">Select Home State</option>
            <option value="Andhra Pradesh">Andhra Pradesh</option>
            <option value="Arunachal Pradesh">Arunachal Pradesh</option>
            <option value="Assam">Assam</option>
            <option value="Bihar">Bihar</option>
            <option value="Chhattisgarh">Chhattisgarh</option>
            <option value="Goa">Goa</option>
            <option value="Gujarat">Gujarat</option>
            <option value="Haryana">Haryana</option>
            <option value="Himachal Pradesh">Himachal Pradesh</option>
            <option value="Jharkhand">Jharkhand</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Kerala">Kerala</option>
            <option value="Madhya Pradesh">Madhya Pradesh</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Manipur">Manipur</option>
            <option value="Meghalaya">Meghalaya</option>
            <option value="Mizoram">Mizoram</option>
            <option value="Nagaland">Nagaland</option>
            <option value="Odisha">Odisha</option>
            <option value="Punjab">Punjab</option>
            <option value="Rajasthan">Rajasthan</option>
            <option value="Sikkim">Sikkim</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="Telangana">Telangana</option>
            <option value="Tripura">Tripura</option>
            <option value="Uttar Pradesh">Uttar Pradesh</option>
            <option value="Uttarakhand">Uttarakhand</option>
            <option value="West Bengal">West Bengal</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* If Home State is Other */}
        {homeState === 'Other' && (
          <div>
            <label className="block mb-1 text-gray-700">
              Please Specify Home State <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={homeStateOther}
              onChange={(e) => {
                setHomeStateOther(e.target.value);
                validateHomeStateOther(e.target.value);
              }}
              className={`w-full p-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                homeStateOtherError ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your home state"
              required
            />
            {homeStateOtherError && (
              <p className="text-red-500 text-sm mt-1">{homeStateOtherError}</p>
            )}
          </div>
        )}

        {/* Questions */}
        <div>
          <label className="block mb-1 text-gray-700">Questions / Help Needed</label>
          <textarea
            value={questions}
            onChange={(e) => setQuestions(e.target.value)}
            rows={4}
            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Your specific questions..."
          />
        </div>

        {/* File Uploads Based on Rank Type */}
        {rankType === 'JEE Main' && (
          <FileInput
            label="Upload JEE Main Scorecard <span className='text-red-500'>*</span>"
            onChange={(e) => setScorecardMain(e.target.files?.[0] || null)}
            accept=".jpg,.jpeg,.png,.pdf"
            required
          />
        )}
        {rankType === 'JEE Advanced' && (
          <>
            <FileInput
              label="Upload JEE Main Scorecard <span className='text-red-500'>*</span>"
              onChange={(e) => setScorecardMain(e.target.files?.[0] || null)}
              accept=".jpg,.jpeg,.png,.pdf"
              required
            />
            <FileInput
              label="Upload JEE Advanced Scorecard <span className='text-red-500'>*</span>"
              onChange={(e) => setScorecardAdvanced(e.target.files?.[0] || null)}
              accept=".jpg,.jpeg,.png,.pdf"
              required
            />
          </>
        )}

        {/* Scan to Pay Box + Payment Receipt */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="text-center border border-gray-300 rounded-lg p-4">
            <p className="text-gray-700 font-medium mb-2">Scan to Pay (₹499 only)</p>
            <Image
  src="/images/download.jpg"
  alt="QR Code"
  width={192} // w-48 = 12rem = 192px
  height={192} // h-48 = 192px
  className="mx-auto rounded-lg border"
/>
          </div>
          <FileInput
            label="Upload Payment Receipt <span className='text-red-500'>*</span>"
            onChange={(e) => setPaymentReceipt(e.target.files?.[0] || null)}
            accept=".jpg,.jpeg,.png,.pdf"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition cursor-pointer"
        >
          {isSubmitting ? 'Submitting...' : isSubmitted ? 'Submitted ✅' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default JosaaHelpForm;

// FileInput Component
const FileInput = ({
  label,
  onChange,
  accept,
  required = false,
}: {
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  accept?: string;
  required?: boolean;
}) => (
  <div>
    <label className="block mb-1 text-gray-700 font-medium">
      <span dangerouslySetInnerHTML={{ __html: label }} />
    </label>
    <input
      type="file"
      onChange={onChange}
      accept={accept}
      {...(required ? { required: true } : {})}
      className="block w-full text-sm text-gray-600
        file:mr-4 file:py-2 file:px-4 file:border file:rounded-lg
        file:text-sm file:font-semibold file:bg-indigo-50
        file:text-indigo-700 hover:file:bg-indigo-100"
    />
  </div>
);
