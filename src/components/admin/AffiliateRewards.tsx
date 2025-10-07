import React, { useState } from 'react';
import { DollarSign, CheckCircle, XCircle, Download, Calendar, Users, Filter } from 'lucide-react';
import { mockMonthlyRewards, mockAffiliateSummaries } from '../../data/affiliateMockData';
import { MonthlyReward, AffiliateSummary } from '../../types';

const AffiliateRewards: React.FC = () => {
  const [monthlyRewards, setMonthlyRewards] = useState<MonthlyReward[]>(mockMonthlyRewards);
  const [summaries] = useState<AffiliateSummary[]>(mockAffiliateSummaries);
  const [filterStatus, setFilterStatus] = useState<'all' | 'unpaid' | 'paid'>('all');
  const [selectedYear, setSelectedYear] = useState<number>(2024);
  const [selectedMonth, setSelectedMonth] = useState<number | 'all'>('all');
  const [selectedAffiliate, setSelectedAffiliate] = useState<string>('all');
  const [selectedRewards, setSelectedRewards] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'monthly' | 'summary'>('monthly');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY'
    }).format(amount);
  };

  const formatDate = (dateString?: string) => {
    return dateString ? new Date(dateString).toLocaleDateString('ja-JP') : '-';
  };

  const formatMonth = (year: number, month: number) => {
    return `${year}年${month}月`;
  };

  const getPaymentStatusBadge = (status: 'unpaid' | 'paid') => {
    return status === 'paid' ? (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
        <CheckCircle className="h-3 w-3 mr-1" />
        支払い済み
      </span>
    ) : (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
        <XCircle className="h-3 w-3 mr-1" />
        未払い
      </span>
    );
  };

  const updatePaymentStatus = (id: string, newStatus: 'unpaid' | 'paid') => {
    setMonthlyRewards(prev => prev.map(reward => 
      reward.id === id 
        ? { 
            ...reward, 
            paymentStatus: newStatus,
            paymentDate: newStatus === 'paid' ? new Date().toISOString().split('T')[0] : undefined
          }
        : reward
    ));
  };

  const updateMultiplePaymentStatus = (ids: string[], newStatus: 'unpaid' | 'paid') => {
    setMonthlyRewards(prev => prev.map(reward => 
      ids.includes(reward.id)
        ? { 
            ...reward, 
            paymentStatus: newStatus,
            paymentDate: newStatus === 'paid' ? new Date().toISOString().split('T')[0] : undefined
          }
        : reward
    ));
    setSelectedRewards([]);
  };

  const toggleRewardSelection = (id: string) => {
    setSelectedRewards(prev => 
      prev.includes(id) 
        ? prev.filter(rewardId => rewardId !== id)
        : [...prev, id]
    );
  };

  const selectAllRewards = () => {
    const filteredRewards = getFilteredRewards();
    setSelectedRewards(filteredRewards.map(reward => reward.id));
  };

  const clearSelection = () => {
    setSelectedRewards([]);
  };

  const getFilteredRewards = () => {
    return monthlyRewards.filter(reward => {
      const statusMatch = filterStatus === 'all' || reward.paymentStatus === filterStatus;
      const yearMatch = selectedYear === 'all' || reward.year === selectedYear;
      const monthMatch = selectedMonth === 'all' || reward.month === selectedMonth;
      const affiliateMatch = selectedAffiliate === 'all' || reward.affiliateId === selectedAffiliate;
      
      return statusMatch && yearMatch && monthMatch && affiliateMatch;
    });
  };

  const filteredRewards = getFilteredRewards();

  const totalUnpaid = filteredRewards
    .filter(reward => reward.paymentStatus === 'unpaid')
    .reduce((sum, reward) => sum + reward.rewardAmount, 0);

  const totalPaid = filteredRewards
    .filter(reward => reward.paymentStatus === 'paid')
    .reduce((sum, reward) => sum + reward.rewardAmount, 0);

  const totalAmount = totalUnpaid + totalPaid;

  const years = Array.from(new Set(monthlyRewards.map(reward => reward.year))).sort();
  const months = Array.from(new Set(monthlyRewards.map(reward => reward.month))).sort();
  const affiliates = Array.from(new Set(monthlyRewards.map(reward => ({ id: reward.affiliateId, name: reward.affiliateName }))));

  const exportData = () => {
    const csvContent = [
      ['アフィリエイター名', '年月', '報酬額', '支払い状況', '支払い日', '備考'],
      ...filteredRewards.map(reward => [
        reward.affiliateName,
        formatMonth(reward.year, reward.month),
        reward.rewardAmount.toString(),
        reward.paymentStatus === 'paid' ? '支払い済み' : '未払い',
        formatDate(reward.paymentDate),
        reward.notes || ''
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `affiliate_rewards_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">報酬管理</h1>
        <div className="flex space-x-3">
          <div className="flex space-x-2">
            <button
              onClick={() => setViewMode('monthly')}
              className={`px-3 py-2 text-sm font-medium rounded-md ${
                viewMode === 'monthly'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Calendar className="h-4 w-4 mr-1 inline" />
              月次管理
            </button>
            <button
              onClick={() => setViewMode('summary')}
              className={`px-3 py-2 text-sm font-medium rounded-md ${
                viewMode === 'summary'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Users className="h-4 w-4 mr-1 inline" />
              累積サマリー
            </button>
          </div>
          <button
            onClick={exportData}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <Download className="h-4 w-4 mr-2" />
            CSVエクスポート
          </button>
        </div>
      </div>

      {/* サマリーカード */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <DollarSign className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    未払い報酬総額
                  </dt>
                  <dd className="text-lg font-medium text-red-600">
                    {formatCurrency(totalUnpaid)}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <DollarSign className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    支払い済み報酬総額
                  </dt>
                  <dd className="text-lg font-medium text-green-600">
                    {formatCurrency(totalPaid)}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <DollarSign className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    総報酬額
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {formatCurrency(totalAmount)}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* フィルターセクション */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center mb-4">
          <Filter className="h-5 w-5 text-gray-400 mr-2" />
          <h2 className="text-lg font-medium text-gray-900">フィルター</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">支払い状況</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as 'all' | 'unpaid' | 'paid')}
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">すべて</option>
              <option value="unpaid">未払い</option>
              <option value="paid">支払い済み</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">年</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">すべて</option>
              {years.map(year => (
                <option key={year} value={year}>{year}年</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">月</label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value === 'all' ? 'all' : Number(e.target.value))}
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">すべて</option>
              {months.map(month => (
                <option key={month} value={month}>{month}月</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">アフィリエイター</label>
            <select
              value={selectedAffiliate}
              onChange={(e) => setSelectedAffiliate(e.target.value)}
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">すべて</option>
              {affiliates.map(affiliate => (
                <option key={affiliate.id} value={affiliate.id}>{affiliate.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 一括操作セクション */}
      {selectedRewards.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-sm font-medium text-blue-900">
                {selectedRewards.length}件のレコードが選択されています
              </span>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => updateMultiplePaymentStatus(selectedRewards, 'paid')}
                className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-white bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="h-3 w-3 mr-1" />
                一括支払い済みにする
              </button>
              <button
                onClick={() => updateMultiplePaymentStatus(selectedRewards, 'unpaid')}
                className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-white bg-red-600 hover:bg-red-700"
              >
                <XCircle className="h-3 w-3 mr-1" />
                一括未払いに戻す
              </button>
              <button
                onClick={clearSelection}
                className="inline-flex items-center px-3 py-1 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
              >
                選択解除
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 月次報酬テーブル */}
      {viewMode === 'monthly' && (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">月次報酬一覧</h2>
            <div className="flex space-x-2">
              <button
                onClick={selectAllRewards}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                すべて選択
              </button>
              <button
                onClick={clearSelection}
                className="text-sm text-gray-600 hover:text-gray-800"
              >
                選択解除
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      checked={selectedRewards.length === filteredRewards.length && filteredRewards.length > 0}
                      onChange={() => selectedRewards.length === filteredRewards.length ? clearSelection() : selectAllRewards()}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    アフィリエイター名
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    年月
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    報酬額
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    支払い状況
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    支払い日
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    備考
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRewards.map((reward) => (
                  <tr key={reward.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedRewards.includes(reward.id)}
                        onChange={() => toggleRewardSelection(reward.id)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {reward.affiliateName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatMonth(reward.year, reward.month)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(reward.rewardAmount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getPaymentStatusBadge(reward.paymentStatus)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(reward.paymentDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {reward.notes || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        {reward.paymentStatus === 'unpaid' ? (
                          <button
                            onClick={() => updatePaymentStatus(reward.id, 'paid')}
                            className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-white bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="h-3 w-3 mr-1" />
                            支払い済み
                          </button>
                        ) : (
                          <button
                            onClick={() => updatePaymentStatus(reward.id, 'unpaid')}
                            className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-white bg-red-600 hover:bg-red-700"
                          >
                            <XCircle className="h-3 w-3 mr-1" />
                            未払い
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 累積サマリーテーブル */}
      {viewMode === 'summary' && (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">アフィリエイター別累積サマリー</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    アフィリエイター名
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    総報酬額
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    未払い額
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    支払い済み額
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    最終支払い日
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    次回支払い予定日
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {summaries.map((summary) => (
                  <tr key={summary.affiliateId} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {summary.affiliateName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(summary.totalReward)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                      {formatCurrency(summary.unpaidAmount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                      {formatCurrency(summary.paidAmount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(summary.lastPaymentDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(summary.nextPaymentDate)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AffiliateRewards;
