import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import CourseTable from "../components/CourseTable";
import SearchBar from "../components/Searchbar";
import FullscreenSpinner from "../components/FullscreenSpinner";
import { Button } from "react-bootstrap";
export default function ShoppingCart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000";
  const userId = JSON.parse(localStorage.getItem("user"))?.id;
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/api/users/${userId}/cart`);
        const data = await res.json();
        setCart(Array.isArray(data) ? data : data);
      } catch (e) {
        console.error("Load courses failed", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  //Drop class
  const handleDrop = async (course) => {
    setLoading(true);
    try {
      const courseId = course._id;
      const res = await fetch(
        `${API_BASE}/api/users/${userId}/cart/${courseId}`,
        {
          method: "DELETE",
        }
      );
      if (!res.ok) {
        const msg = await res.text();
        console.error("Drop failed:", msg);
        alert("Course not dropped. Please contact an ADMIN or try again.");
        return;
      }
      setCart((prev) => prev.filter((c) => c._id !== courseId));
      alert("Class Dropped");
    } finally {
      setLoading(false);
    }
  };
  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/users/${userId}/cart/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const text = await res.text();
      console.log("Checkout response:", res.status, text);

      if (!res.ok) {
        alert(`Checkout failed: ${res.status}`);
        return;
      }

      const data = JSON.parse(text);
      setCart([]);
      alert("Checkout Successful!");
      console.log("Enrolled classes:", data.myClasses);
      navigate("/myclasses");
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Error checking out classes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <FullscreenSpinner show={loading} />
      <Header />
      <div className="p">
        <SearchBar />
        <div className="d-flex align-items-center justify-content-center">
          <Button size="lg" variant="outline-dark" className="mt-3 mb-5">
            Search
          </Button>
        </div>
        <div
          style={{
            paddingBottom: "10rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <CourseTable
            courses={cart}
            showDanger
            onDanger={handleDrop}
            style={{ paddingBottom: "10rem" }}
          />
          {cart.length > 0 ? (
            <Button
              size="lg"
              variant="primary"
              className="mt-3 mb-5"
              style={{ width: "25vw" }}
              onClick={handleCheckout}
            >
              Checkout
            </Button>
          ) : (
            <>
              <p>You currently don't have any classes in your cart.</p>
              <Button
                size="lg"
                variant="primary"
                className="mt-3 mb-5"
                style={{ width: "25vw" }}
                as={Link}
                to="/addclasses"
              >
                Add Classes
              </Button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
