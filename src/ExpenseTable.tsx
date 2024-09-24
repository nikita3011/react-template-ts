import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import "bootstrap/dist/css/bootstrap.min.css";

interface Expense {
  id: number;
  merchant: string;
  amount: number;
  description: string;
  date: string;
  category: string;
  status: string;
}

const ExpenseTable = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://expenses-backend-mu.vercel.app/expenses",
          {
            headers: {
              "Content-Type": "application/json",
              Username: "nikita.ghule",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
      
        const data = await response.json();
        console.log (data)
        setExpenses(data);
        setLoading(false);
      } catch (err) {
        setError((err as Error).message);
        setLoading(false);
      }
    };
    fetchExpenses();
  }, []);

  return (
    <div className="table-container">
      <h1>Expenses</h1>
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Date</th>
              <th>Merchant</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Description</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td>{new Date(expense.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric'}) }</td>
                <td>{expense.merchant}</td>
                <td>{`£`}{expense.amount}</td>
                <td>{expense.category}</td>
                <td>{expense.description}</td>
                <td>{expense.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default ExpenseTable;
