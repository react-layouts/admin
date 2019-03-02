import React from "react";
import { AdminLayout } from "../lib";

function Nav() {
  return <div>Nav Section</div>;
}

function Sidebar() {
  return (
    <div>
      <h2>Sidebar</h2>
      <ul>
        <li>Item One</li>
        <li>Item Two</li>
        <li>Item Three</li>
      </ul>
    </div>
  );
}

function Footer() {
  return <div>Footer Section</div>;
}

function Lorem() {
  return (
    <div>
      <h1>Content Section</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Vehicula ipsum a
        arcu cursus vitae congue. Leo vel fringilla est ullamcorper eget nulla
        facilisi. Morbi blandit cursus risus at ultrices mi. Proin libero nunc
        consequat interdum varius sit amet mattis. Urna condimentum mattis
        pellentesque id nibh. Ut pharetra sit amet aliquam. Nec feugiat in
        fermentum posuere urna nec tincidunt. Ut pharetra sit amet aliquam.
        Felis eget velit aliquet sagittis id consectetur purus ut faucibus. Orci
        porta non pulvinar neque laoreet suspendisse interdum consectetur libero
      </p>
    </div>
  );
}

function App() {
  return (
    <AdminLayout
      header={<span>&nbsp;Header Section</span>}
      footer={<Footer />}
      sidebar={<Sidebar />}
      nav={<Nav />}
    >
      <Lorem />
    </AdminLayout>
  );
}

export default App;
