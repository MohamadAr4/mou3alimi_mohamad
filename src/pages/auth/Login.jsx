import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/auth.store";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function Login() {
  const navigate = useNavigate();
  const { login, error: authError, isLoading: authLoading } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLocalError("");

    if (!email || !password) {
      setLocalError("الرجاء إدخال البريد الإلكتروني وكلمة المرور");
      return;
    }

    try {
      const credentials = {
        phone_number: email,
        password: password,
      };

      await login(credentials);
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const errorToDisplay = authError || localError;

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background">
      {/* Left Graphic Section (Hidden on mobile) */}
      <div
        className="hidden md:flex md:w-1/2 bg-gradient-to-br from-primary to-secondary items-center justify-center p-12 relative overflow-hidden"
        data-aos="fade-right"
      >
        {/* Background Pattern with Educational Icons */}
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4yIj48cGF0aCBkPSJNMzAgMTVjLTguMjggMC0xNSA2LjcyLTE1IDE1czYuNzIgMTUgMTUgMTUgMTUtNi43MiAxNS0xNS02LjcyLTE1LTE1LTE1em0wIDRjNi4wNyAwIDExIDQuOTMgMTEgMTFzLTQuOTMgMTEtMTEgMTEtMTEtNC45My0xMS0xMSA0LjkzLTExIDExLTExeiIvPjxwYXRoIGQ9Ik0zMCAxMGMxMSAwIDIwIDkgMjAgMjBzLTkgMjAtMjAgMjAtMjAtOS0yMC0yMCA5LTIwIDIwLTIwem0wIDRjLTguODMgMC0xNiA3LjE3LTE2IDE2czcuMTcgMTYgMTYgMTYgMTYtNy4xNyAxNi0xNi03LjE3LTE2LTE2LTE2eiIvPjwvZz48L2c+PC9zdmc+')]"></div>

        {/* Content */}
        <div
          className="text-center z-10 text-white"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <div className="mb-8">
            <div className="inline-block p-4 bg-white/20 rounded-full backdrop-blur-sm mb-4">
              <svg
                className="w-12 h-12 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h1 className="text-4xl font-bold mb-2">منصة مُعلمي التعليمية</h1>
            <p className="text-xl opacity-90">نحو تعليم مميز وإدارة فاعلة</p>
          </div>

          {/* Educational Features Grid */}
          <div className="grid grid-cols-2 gap-6 max-w-md mx-auto">
            <div className="bg-white/20 p-4 rounded-xl backdrop-blur-sm">
              <svg
                className="w-8 h-8 mx-auto mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <p className="text-sm">إدارة المناهج</p>
            </div>

            <div className="bg-white/20 p-4 rounded-xl backdrop-blur-sm">
              <svg
                className="w-8 h-8 mx-auto mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              <p className="text-sm">تخطيط الدروس</p>
            </div>

            <div className="bg-white/20 p-4 rounded-xl backdrop-blur-sm">
              <svg
                className="w-8 h-8 mx-auto mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              <p className="text-sm">تقويم الطلاب</p>
            </div>

            <div className="bg-white/20 p-4 rounded-xl backdrop-blur-sm">
              <svg
                className="w-8 h-8 mx-auto mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <p className="text-sm">تواصل مع أولياء الأمور</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Login Section */}
      <div
        className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white"
        data-aos="fade-left"
      >
        <div className="w-full max-w-md">
          {/* Logo/Header */}
          <div className="text-center mb-10" data-aos="fade-down">
            <h2 className="text-3xl font-bold text-text">مرحباً بعودتك</h2>
            <p className="text-gray-500 mt-2">
              الرجاء إدخال بيانات الدخول الخاصة بك
            </p>
          </div>

          {/* Error Message */}
          {errorToDisplay && (
            <div 
              className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-md"
              data-aos="fade-down"
              data-aos-delay="100"
            >
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="font-medium">{errorToDisplay}</p>
              </div>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-text"
              >
                البريد الإلكتروني
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setLocalError("");
                  }}
                  className="w-full px-4 py-3 bg-background/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
                  placeholder="example@domain.com"
                  dir="rtl"
                  required
                />
                <div className="absolute left-3 top-3.5 text-gray-400 mr-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-text"
              >
                كلمة المرور
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="w-full px-4 py-3 bg-background/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setLocalError("");
                  }}
                  dir="rtl"
                  required
                />
                <div className="absolute left-3 top-3.5 text-gray-400">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <button
                  type="button"
                  className="absolute left-10 top-3.5 text-gray-400 hover:text-accent transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {showPassword ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    )}
                  </svg>
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={authLoading}
              className={`w-full py-3 px-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-lg shadow-md transition-all duration-300 ${
                authLoading ? "opacity-80" : "hover:shadow-lg hover:scale-[1.02]"
              }`}
            >
              {authLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>جاري التحميل...</span>
                </div>
              ) : (
                "تسجيل الدخول"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;