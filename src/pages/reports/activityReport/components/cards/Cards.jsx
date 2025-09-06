import React from "react";

function Cards({
  countActiveUsers,
  countActiveUsersLastWeek,
  countNewUsers,
  countNewUsersLastWeek,
  countSubscription,
  countSubscriptionLastWeek
}) {
  // Calculate percentage changes
  const activeUsersChange = countActiveUsersLastWeek > 0 
    ? ((countActiveUsers - countActiveUsersLastWeek) / countActiveUsersLastWeek * 100).toFixed(1)
    : countActiveUsers > 0 ? 100 : 0;
    
  const newUsersChange = countNewUsersLastWeek > 0 
    ? ((countNewUsers - countNewUsersLastWeek) / countNewUsersLastWeek * 100).toFixed(1)
    : countNewUsers > 0 ? 100 : 0;
    
  const subscriptionChange = countSubscriptionLastWeek > 0 
    ? ((countSubscription - countSubscriptionLastWeek) / countSubscriptionLastWeek * 100).toFixed(1)
    : countSubscription > 0 ? 100 : 0;

  // Determine text color based on change (green for positive, red for negative)
  const activeUsersChangeColor = activeUsersChange >= 0 ? "text-green-600" : "text-red-600";
  const newUsersChangeColor = newUsersChange >= 0 ? "text-green-600" : "text-red-600";
  const subscriptionChangeColor = subscriptionChange >= 0 ? "text-green-600" : "text-red-600";

  // Format change indicator (↑ for increase, ↓ for decrease)
  const activeUsersChangeIndicator = activeUsersChange >= 0 ? "↑" : "↓";
  const newUsersChangeIndicator = newUsersChange >= 0 ? "↑" : "↓";
  const subscriptionChangeIndicator = subscriptionChange >= 0 ? "↑" : "↓";

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-100">
        <h3 className="text-sm font-medium text-blue-600 mb-1">
          المستخدمون النشطون
        </h3>
        <p className="text-2xl font-bold text-gray-800">{countActiveUsers?.toLocaleString() || 0}</p>
        <p className={`text-sm ${activeUsersChangeColor} mt-1`}>
          {activeUsersChangeIndicator} {Math.abs(activeUsersChange)}% عن الأسبوع الماضي
        </p>
      </div>
      
      <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-100">
        <h3 className="text-sm font-medium text-purple-600 mb-1">
          المستخدمون الجدد
        </h3>
        <p className="text-2xl font-bold text-gray-800">{countNewUsers?.toLocaleString() || 0}</p>
        <p className={`text-sm ${newUsersChangeColor} mt-1`}>
          {newUsersChangeIndicator} {Math.abs(newUsersChange)}% عن الأسبوع الماضي
        </p>
      </div>
      
      <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl border border-green-100">
        <h3 className="text-sm font-medium text-green-600 mb-1">
          مشتركين الحزمات
        </h3>
        <p className="text-2xl font-bold text-gray-800">{countSubscription?.toLocaleString() || 0}</p>
        <p className={`text-sm ${subscriptionChangeColor} mt-1`}>
          {subscriptionChangeIndicator} {Math.abs(subscriptionChange)}% عن الأسبوع الماضي
        </p>
      </div>
    </div>
  );
}

export default Cards;