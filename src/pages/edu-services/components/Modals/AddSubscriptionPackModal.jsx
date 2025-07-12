import React from 'react'

function AddSubscriptionPackModal({showAddPackModal , packData ,setPackData , setShowAddPackModal , handleSaveNewPack  }) {
  return (
    <div>
       {showAddPackModal && (
          <div className="fixed inset-0 bg-[rgb(var(--text)/0.3)] backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-2xl max-w-md w-full overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--secondary))] p-4">
                <h2 className="text-xl font-bold text-white">
                  إضافة حزمة جديدة
                </h2>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[rgb(var(--text))] mb-1">
                    اسم الحزمة
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={packData.name}
                    onChange={(e) =>
                      setPackData({ ...packData, name: e.target.value })
                    }
                    className="input-field w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[rgb(var(--text))] mb-1">
                    عدد مرات الاستخدام
                  </label>
                  <input
                    type="number"
                    name="usageLimit"
                    value={packData.usageLimit}
                    onChange={(e) =>
                      setPackData({ ...packData, usageLimit: e.target.value })
                    }
                    className="input-field w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[rgb(var(--text))] mb-1">
                    السعر ($)
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={packData.price}
                    onChange={(e) =>
                      setPackData({ ...packData, price: e.target.value })
                    }
                    className="input-field w-full"
                  />
                </div>
              </div>

              <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
                <button
                  onClick={() => setShowAddPackModal(false)}
                  className="px-4 py-2 rounded-md border border-gray-300 text-[rgb(var(--text))] hover:bg-gray-50"
                >
                  إلغاء
                </button>
                <button
                  onClick={handleSaveNewPack}
                  className="btn-primary px-4 py-2"
                >
                  إضافة الحزمة
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
  )
}

export default AddSubscriptionPackModal