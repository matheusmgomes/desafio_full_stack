"use client";
import { useState, useEffect } from "react";

export default function CadastroPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [usuarios, setUsuarios] = useState([]);

  const fetchUsuarios = async () => {
    try {
      const res = await fetch("http://localhost:3000/users");
      const data = await res.json();
      setUsuarios(data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("Usuário cadastrado com sucesso!");
      setFormData({ name: "", email: "" });
      fetchUsuarios();
    } else if (response.status === 409) {
      alert("Usuário já cadastrado");
    } else if (response.status === 400) {
      alert("Campos obrigatórios não foram preenchidos.");
    } else {
      alert("Erro ao cadastrar usuário.");
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 mb-10 p-4 border rounded"
      >
        <h2 className="text-lg font-bold">Novo Cadastro</h2>
        <input
          placeholder="Nome"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="border p-2"
        />
        <input
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="border p-2"
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          Cadastrar
        </button>
      </form>

      {/* Lista de Usuários */}
      <div>
        <h2 className="text-lg font-bold mb-4">
          Usuários Cadastrados ({usuarios.length})
        </h2>
        <ul className="space-y-2">
          {usuarios.map((user: any) => (
            <li key={user.email} className="p-3 border rounded shadow-sm">
              <p className="font-semibold">{user.name}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
