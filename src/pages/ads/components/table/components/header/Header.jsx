function Header() {
  const headerCells = [
    {
      text: "right",
      name: "اسم المعلن",
    },
     {
      text: "right",
      name: "العنوان",
    },
    {
      text: "right",
      name: "الخدمة",
    },
    {
      text: "right",
      name: "الحالة",
    },
    {
      text: "center",
      name: "الاجراءات",
    },
  ];
  return (
    <thead className="bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--secondary))]">
      <tr>
        {headerCells.map((cell) => {
          return (
            <>
              <th className={`px-6 py-4 text-${cell.text} text-sm font-semibold text-white uppercase tracking-wider`}>
                {cell.name}
              </th>
            </>
          );
        })}
      </tr>
    </thead>
  );
}

export default Header;
