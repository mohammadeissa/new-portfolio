"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
} from "chart.js";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import "@/styles/Analytics.css";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement
);

export default function AnalyticsPage() {
  const [data, setData] = useState({
    visitors: 0,
    messages: 0,
    responseTimes: [],
    questions: {},
    topics: {},
  });

  useEffect(() => {
    fetch("/api/analytics")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch(() => {});
  }, []);

  const safeResponseTimes = Array.isArray(data.responseTimes)
    ? data.responseTimes
    : [];
  const safeTopics =
    data.topics && typeof data.topics === "object" ? data.topics : {};
  const safeQuestions =
    data.questions && typeof data.questions === "object" ? data.questions : {};

  const avgResponse =
    safeResponseTimes.length === 0
      ? 0
      : safeResponseTimes.reduce((a, b) => a + b, 0) /
        safeResponseTimes.length;

  const metrics = [
    { label: "Visitors", value: data.visitors },
    { label: "Messages Sent", value: data.messages },
    { label: "Avg. Response Time", value: `${avgResponse.toFixed(1)} ms` },
    { label: "Unique Topics", value: Object.keys(safeTopics).length },
  ];

  const topicDistribution = useMemo(() => {
    const labels = Object.keys(safeTopics);
    const values = Object.values(safeTopics);
    return {
      labels: labels.length ? labels : ["No data"],
      datasets: [
        {
          data: values.length ? values : [1],
          backgroundColor: [
            "#0070f3",
            "#22c55e",
            "#f59e0b",
            "#a855f7",
            "#94a3b8",
          ],
          hoverOffset: 6,
        },
      ],
    };
  }, [data.topics]);

  const responseTimes = {
    labels: ["Samples"],
    datasets: [
      {
        label: "Avg Response (ms)",
        data: [Number(avgResponse.toFixed(1))],
        backgroundColor: "#22c55e",
        borderColor: "#16a34a",
        borderWidth: 2,
      },
    ],
  };

  const popularQuestions = useMemo(() => {
    return Object.entries(safeQuestions)
      .map(([q, count]) => ({ q, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [safeQuestions]);

  return (
    <main className="analytics-page">
      <div className="analytics-header">
        <div>
          <div className="analytics-title">AI Chatbot Analytics</div>
          <div className="analytics-subtitle">
            Live insights on usage and topics from your portfolio chatbot.
          </div>
        </div>
      </div>

      <section className="metrics-grid">
        {metrics.map((m) => (
          <div key={m.label} className="metric-card">
            <div className="metric-label">{m.label}</div>
            <div className="metric-value">{m.value}</div>
          </div>
        ))}
      </section>

      <section className="charts-grid">
        <div className="chart-card">
          <div className="card-title">Topic Distribution</div>
          <Doughnut data={topicDistribution} />
        </div>

        <div className="chart-card">
          <div className="card-title">Average Response Time</div>
          <Bar
            data={responseTimes}
            options={{
              plugins: { legend: { display: false } },
              maintainAspectRatio: true,
              scales: { y: { beginAtZero: true } },
            }}
          />
        </div>
      </section>

      <div className="common-questions">
        <div className="card-title">Most Common Questions</div>
        {popularQuestions.length === 0 && (
          <div className="question-item">
            <div className="question-text">No activity yet.</div>
          </div>
        )}
        {popularQuestions.map((item) => (
          <div key={item.q} className="question-item">
            <div className="question-text">{item.q}</div>
            <div className="question-meta">{item.count} mentions</div>
          </div>
        ))}
      </div>
    </main>
  );
}
