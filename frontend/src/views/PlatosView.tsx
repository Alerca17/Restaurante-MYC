import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../config/axios";
import { toast } from "sonner";
import { isAxiosError } from "axios";

interface Plato {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  disponible: boolean;
  imagen: string;
  categorias: number[]; // ids de categorías asociadas
}

interface Categoria {
  id: number;
  nombre: string;
}

export default function PlatosView() {
  const navigate = useNavigate();
  const [platos, setPlatos] = useState<Plato[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoriasMap, setCategoriasMap] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [userRole, setUserRole] = useState<string>("cliente");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const rol = localStorage.getItem("rol");
    if (!token) {
      navigate("/auth/login");
      return;
    }
    if (rol) setUserRole(rol);
    fetchCategorias();
    fetchPlatos();
    // eslint-disable-next-line
  }, [navigate]);

  const fetchPlatos = async () => {
    try {
      setLoading(true);
      // El endpoint debe devolver los platos con un array de ids de categorías asociadas
      // Ejemplo de cada plato: { ..., categorias: [1, 3, 5] }
      const { data } = await api.get<Plato[]>("/api/platos");
      setPlatos(data || []);
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.error || "Error al cargar los platos");
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchCategorias = async () => {
    try {
      const { data } = await api.get<Categoria[]>("/api/categorias");
      setCategorias(data || []);
      const map: Record<number, string> = {};
      (data || []).forEach((cat: Categoria) => {
        map[cat.id] = cat.nombre;
      });
      setCategoriasMap(map);
    } catch (error) {
      toast.error("Error al cargar las categorías");
    }
  };

  const handleToggleDisponibilidad = async (platoId: number, disponible: boolean) => {
    if (userRole !== "admin") return;
    try {
      await api.patch(`/api/platos/${platoId}`, { disponible: !disponible });
      setPlatos(platos.map(plato =>
        plato.id === platoId
          ? { ...plato, disponible: !disponible }
          : plato
      ));
      toast.success(`Plato ${!disponible ? 'habilitado' : 'deshabilitado'} correctamente`);
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.error || "Error al actualizar el plato");
      }
    }
  };

  // Selección múltiple de categorías
  const toggleCategory = (catId: number) => {
    setSelectedCategories(prev =>
      prev.includes(catId)
        ? prev.filter(id => id !== catId)
        : [...prev, catId]
    );
  };

  // Filtrado por categorías (al menos una coincidencia) y búsqueda
  const filteredPlatos = platos.filter(plato => {
    const matchesCategory =
      selectedCategories.length === 0 ||
      plato.categorias.some(catId => selectedCategories.includes(catId));
    const matchesSearch = plato.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getCategoriaNombres = (ids: number[]) => {
    return ids.map(id => categoriasMap[id]).filter(Boolean).join(", ");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#D4AF37] mx-auto mb-4"></div>
          <p className="text-[#F5F5F5] text-lg">Cargando platos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D0D0D] via-[#1A1A1A] to-[#0D0D0D] py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#F5F5F5] mb-2">
            Nuestros Platos
          </h1>
          <p className="text-[#B3B3B3] text-lg">
            Descubre nuestra deliciosa selección culinaria
          </p>
        </div>

        {/* Search */}
        <div className="mb-6 flex justify-center">
          <input
            type="text"
            placeholder="Buscar platos por nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md bg-[#0D0D0D] border border-[#333] text-[#F5F5F5] placeholder-[#B3B3B3] px-4 py-2 rounded-lg focus:border-[#D4AF37] focus:outline-none transition-colors"
          />
        </div>

        {/* Categories */}
        <div className="mb-8 flex flex-wrap gap-2 justify-center">
          {categorias.map((cat) => (
            <button
              key={cat.id}
              onClick={() => toggleCategory(cat.id)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                selectedCategories.includes(cat.id)
                  ? "bg-[#D4AF37] text-[#0D0D0D] border-2 border-[#D4AF37]"
                  : "bg-[#333] text-[#F5F5F5] hover:bg-[#D4AF37] hover:text-[#0D0D0D]"
              }`}
            >
              {cat.nombre}
            </button>
          ))}
          {selectedCategories.length > 0 && (
            <button
              onClick={() => setSelectedCategories([])}
              className="px-4 py-2 rounded-lg font-semibold bg-red-600 text-white ml-2"
            >
              Limpiar filtros
            </button>
          )}
        </div>

        {/* Results count */}
        <div className="mb-6">
          <p className="text-[#B3B3B3]">
            Mostrando {filteredPlatos.length} de {platos.length} platos
          </p>
        </div>

        {/* Platos Grid */}
        {filteredPlatos.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🍽️</div>
            <p className="text-[#F5F5F5] text-xl mb-2">No se encontraron platos</p>
            <p className="text-[#B3B3B3]">Intenta con otros términos de búsqueda o filtros</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPlatos.map((plato, index) => (
              <div
                key={plato.id}
                className={`bg-[#1A1A1A] border rounded-lg overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
                  plato.disponible 
                    ? "border-[#333] hover:border-[#D4AF37]" 
                    : "border-red-500 opacity-75"
                }`}
                style={{
                  animationDelay: `${index * 50}ms`
                }}
              >
                {/* Imagen del plato */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={plato.imagen}
                    alt={plato.nombre}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    onError={(e) => {
                      e.currentTarget.src = "https://via.placeholder.com/300x200/1A1A1A/D4AF37?text=Sin+Imagen";
                    }}
                  />
                  {!plato.disponible && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="text-red-500 font-bold text-lg">No Disponible</span>
                    </div>
                  )}
                  {userRole === "admin" && (
                    <button
                      onClick={() => handleToggleDisponibilidad(plato.id, plato.disponible)}
                      className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-semibold transition-all ${
                        plato.disponible
                          ? "bg-green-500 text-white hover:bg-green-600"
                          : "bg-red-500 text-white hover:bg-red-600"
                      }`}
                    >
                      {plato.disponible ? "✓" : "✗"}
                    </button>
                  )}
                </div>

                {/* Contenido del plato */}
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-[#F5F5F5] line-clamp-1">
                      {plato.nombre}
                    </h3>
                    <span className="text-[#D4AF37] font-bold text-lg whitespace-nowrap ml-2">
                      {formatPrice(plato.precio)}
                    </span>
                  </div>

                  <p className="text-[#B3B3B3] text-sm mb-3 line-clamp-2">
                    {plato.descripcion}
                  </p>

                  {/* Categorías */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {plato.categorias.map(catId => (
                      <span
                        key={catId}
                        className="px-2 py-1 bg-[#333] text-[#F5F5F5] text-xs rounded-full"
                      >
                        {getCategoriaNombres([catId])}
                      </span>
                    ))}
                  </div>

                  {/* Botones de acción */}
                  <div className="flex gap-2">
                    {userRole === "cliente" && plato.disponible && (
                      <button
                        onClick={() => navigate(`/platos/${plato.id}`)}
                        className="flex-1 bg-[#D4AF37] hover:bg-[#E8C563] text-[#0D0D0D] py-2 px-4 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
                      >
                        Ver Detalles
                      </button>
                    )}
                    
                    {(userRole === "admin" || userRole === "mesero") && (
                      <button
                        onClick={() => navigate(`/platos/${plato.id}/edit`)}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold transition-all duration-200"
                      >
                        Editar
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add new plate button for admin */}
        {userRole === "admin" && (
          <div className="fixed bottom-8 right-8">
            <button
              onClick={() => navigate("/platos/nuevo")}
              className="bg-[#D4AF37] hover:bg-[#E8C563] text-[#0D0D0D] p-4 rounded-full shadow-lg transition-all duration-200 transform hover:scale-110"
              title="Agregar nuevo plato"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}