"use client";

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

const metrics = [
  { label: "Visitors", value: "12,430" },
  { label: "Messages Sent", value: "3,245" },
  { label: "Avg. Response Time", value: "1.8s" },
  { label: "Unique Topics", value: "27" },
];

const messagesPerDay = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Messages",
      data: [220, 310, 280, 330, 350, 270, 240],
      borderColor: "#0070f3",
      backgroundColor: "rgba(0, 112, 243, 0.12)",
      tension: 0.35,
      fill: true,
    },
  ],
};

const topicDistribution = {
  labels: ["Projects", "Background", "Contact", "Business", "Other"],
  datasets: [
    {
      data: [32, 24, 18, 14, 12],
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

const popularQuestions = [
  { q: "What projects have you built with AI?", count: 182 },
  { q: "Can I see your resume?", count: 146 },
  { q: "How to contact you?", count: 121 },
  { q: "What tech stack do you use?", count: 94 },
];

const responseTimes = {
  labels: ["12am", "4am", "8am", "12pm", "4pm", "8pm"],
  datasets: [
    {
      label: "Avg Response (s)",
      data: [2.1, 1.9, 1.7, 1.5, 1.6, 1.8],
      backgroundColor: "#22c55e",
      borderColor: "#16a34a",
      borderWidth: 2,
    },
  ],
};

export default function AnalyticsPage() {
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
          <div className="card-title">Messages by Day</div>
          <Line data={messagesPerDay} options={{ maintainAspectRatio: true }} />
        </div>

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
            }}
          />
        </div>
      </section>

      <div className="common-questions">
        <div className="card-title">Most Common Questions</div>
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
