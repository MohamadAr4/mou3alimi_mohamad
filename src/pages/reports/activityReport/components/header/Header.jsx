function Header() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">تقارير النشاط</h1>
        <p className="text-gray-600">نظرة عامة على نشاط المستخدمين في النظام</p>
      </div>
    </div>
  );
}

export default Header;
