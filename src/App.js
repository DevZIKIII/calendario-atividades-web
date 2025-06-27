import React, {useState, useEffect } from 'react';
import { Calendar, Clock, Edit, Trash2, Plus, Check, X, Book, AlertCircle } from 'lucide-react';

const API_URL = 'http://172.22.32.1:3000/api/activities'; // URL da sua API de atividades

// Estilos CSS
const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f9fafb'
  },
  loadingContainer: {
    minHeight: '100vh',
    backgroundColor: '#f3f4f6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  loadingSpinner: {
    animation: 'spin 1s linear infinite',
    borderRadius: '50%',
    height: '48px',
    width: '48px',
    borderBottom: '2px solid #2563eb',
    margin: '0 auto'
  },
  loadingText: {
    marginTop: '16px',
    color: '#6b7280'
  },
  header: {
    backgroundColor: '#ffffff',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    borderBottom: '1px solid #e5e7eb'
  },
  headerContent: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '16px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center'
  },
  headerIcon: {
    height: '32px',
    width: '32px',
    color: '#2563eb',
    marginRight: '12px'
  },
  headerTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#111827'
  },
  addButton: {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 16px',
    backgroundColor: '#2563eb',
    color: 'white',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'background-color 0.2s'
  },
  main: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '32px 24px'
  },
  errorAlert: {
    marginBottom: '16px',
    padding: '16px',
    backgroundColor: '#fee2e2',
    border: '1px solid #fecaca',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center'
  },
  errorIcon: {
    height: '20px',
    width: '20px',
    color: '#dc2626',
    marginRight: '8px'
  },
  errorText: {
    color: '#991b1b'
  },
  grid: {
    display: 'grid',
    gap: '16px',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))'
  },
  emptyState: {
    gridColumn: '1 / -1',
    textAlign: 'center',
    padding: '48px 0'
  },
  emptyIcon: {
    height: '48px',
    width: '48px',
    color: '#d1d5db',
    margin: '0 auto 16px'
  },
  emptyText: {
    color: '#6b7280',
    fontSize: '16px'
  },
  emptySubtext: {
    color: '#9ca3af',
    fontSize: '14px',
    marginTop: '8px'
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    border: '1px solid #e5e7eb',
    padding: '24px',
    transition: 'box-shadow 0.2s',
    cursor: 'pointer'
  },
  cardCompleted: {
    opacity: '0.75'
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '16px'
  },
  cardTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#111827',
    flex: 1,
    marginRight: '8px'
  },
  cardTitleCompleted: {
    textDecoration: 'line-through',
    color: '#6b7280'
  },
  priorityBadge: {
    padding: '2px 8px',
    borderRadius: '9999px',
    fontSize: '12px',
    fontWeight: '500',
    color: '#ffffff'
  },
  priorityHigh: {
    backgroundColor: '#dc2626'
  },
  priorityMedium: {
    backgroundColor: '#f59e0b'
  },
  priorityLow: {
    backgroundColor: '#10b981'
  },
  cardDescription: {
    fontSize: '14px',
    color: '#4b5563',
    marginBottom: '16px'
  },
  cardDetails: {
    marginBottom: '16px'
  },
  detailItem: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px',
    color: '#6b7280',
    marginBottom: '4px'
  },
  detailIcon: {
    height: '16px',
    width: '16px',
    marginRight: '8px'
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '16px',
    borderTop: '1px solid #e5e7eb'
  },
  actionButton: {
    display: 'flex',
    alignItems: 'center',
    padding: '4px 12px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background-color 0.2s'
  },
  completeButton: {
    backgroundColor: '#d1fae5',
    color: '#065f46'
  },
  reopenButton: {
    backgroundColor: '#f3f4f6',
    color: '#6b7280'
  },
  actionIcon: {
    height: '16px',
    width: '16px',
    marginRight: '4px'
  },
  rightActions: {
    display: 'flex',
    gap: '8px'
  },
  iconButton: {
    padding: '4px',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '4px',
    transition: 'background-color 0.2s'
  },
  editIcon: {
    color: '#2563eb'
  },
  deleteIcon: {
    color: '#dc2626'
  },
  modal: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '16px',
    zIndex: 50
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    maxWidth: '448px',
    width: '100%',
    padding: '24px'
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px'
  },
  modalTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#111827'
  },
  closeButton: {
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    color: '#6b7280'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column'
  },
  label: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#374151',
    marginBottom: '4px'
  },
  input: {
    width: '100%',
    padding: '8px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '16px',
    outline: 'none',
    transition: 'border-color 0.2s'
  },
  textarea: {
    minHeight: '80px',
    resize: 'vertical',
    fontFamily: 'inherit'
  },
  select: {
    width: '100%',
    padding: '8px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '16px',
    backgroundColor: '#ffffff',
    cursor: 'pointer',
    outline: 'none'
  },
  row: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px'
  },
  modalActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    marginTop: '24px'
  },
  cancelButton: {
    padding: '8px 16px',
    backgroundColor: '#f3f4f6',
    color: '#374151',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'background-color 0.2s'
  },
  submitButton: {
    padding: '8px 16px',
    backgroundColor: '#2563eb',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'background-color 0.2s'
  }
};

const spinKeyframes = `
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const App = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingActivity, setEditingActivity] = useState(null);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    subject: '',
    priority: 'medium'
  });

  // Buscar atividades da API
  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Erro ao buscar atividades');
      }
      const data = await response.json();
      setActivities(data);
    } catch (err) {
      setError('Erro ao carregar atividades da API');
    } finally {
      setLoading(false);
    }
  };

  // Criar ou atualizar atividade na API
  const handleSubmit = async () => {
    if (!formData.title || !formData.description || !formData.date || !formData.time || !formData.subject) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    const method = editingActivity ? 'PUT' : 'POST';
    const url = editingActivity ? `${API_URL}/${editingActivity._id}` : API_URL;

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Erro ao salvar atividade');
      }

      fetchActivities(); // Re-buscar atividades para atualizar a lista
      resetForm();
      setError('');
    } catch (err) {
      setError('Erro ao salvar atividade na API');
    }
  };

  // Deletar atividade na API
  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta atividade?')) {
      try {
        const response = await fetch(`${API_URL}/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Erro ao deletar atividade');
        }

        setActivities(activities.filter(activity => activity._id !== id));
      } catch (err) {
        setError('Erro ao deletar atividade na API');
      }
    }
  };

  // Marcar como concluída (ou reabrir) na API
  const toggleComplete = async (id) => {
    const activityToUpdate = activities.find(activity => activity._id === id);
    if (!activityToUpdate) return;

    const updatedActivityData = { ...activityToUpdate, completed: !activityToUpdate.completed };

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedActivityData),
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar atividade');
      }

      const updatedActivities = activities.map(activity =>
        activity._id === id ? { ...activity, completed: !activity.completed } : activity
      );
      setActivities(updatedActivities);
    } catch (err) {
      setError('Erro ao atualizar atividade na API');
    }
  };

  // Funções auxiliares
  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      date: '',
      time: '',
      subject: '',
      priority: 'medium'
    });
    setEditingActivity(null);
    setShowForm(false);
  };

  const handleEdit = (activity) => {
    setFormData({
      title: activity.title,
      description: activity.description,
      // Formata a data para o formato YYYY-MM-DD que o input type="date" espera
      date: new Date(activity.date).toISOString().split('T')[0],
      time: activity.time,
      subject: activity.subject,
      priority: activity.priority
    });
    setEditingActivity(activity);
    setShowForm(true);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    // Adiciona o fuso horário para evitar problemas de data "um dia antes"
    return new Date(date.getTime() + date.getTimezoneOffset() * 60000).toLocaleDateString('pt-BR');
  };

  // Ordenar atividades por data
  const sortedActivities = [...activities].sort((a, b) =>
    new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`)
  );

  if (loading) {
    return (
      <>
        <style>{spinKeyframes}</style>
        <div style={styles.loadingContainer}>
          <div style={{ textAlign: 'center' }}>
            <div style={styles.loadingSpinner}></div>
            <p style={styles.loadingText}>Carregando atividades...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.headerLeft}>
            <Calendar style={styles.headerIcon} />
            <h1 style={styles.headerTitle}>Calendário de Atividades</h1>
          </div>
          <button
            onClick={() => setShowForm(true)}
            style={styles.addButton}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}
          >
            <Plus style={{ height: '20px', width: '20px', marginRight: '8px' }} />
            Nova Atividade
          </button>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main style={styles.main}>
        {error && (
          <div style={styles.errorAlert}>
            <AlertCircle style={styles.errorIcon} />
            <span style={styles.errorText}>{error}</span>
          </div>
        )}

        {/* Lista de Atividades */}
        <div style={styles.grid}>
          {sortedActivities.length === 0 ? (
            <div style={styles.emptyState}>
              <Book style={styles.emptyIcon} />
              <p style={styles.emptyText}>Nenhuma atividade cadastrada</p>
              <p style={styles.emptySubtext}>Clique em "Nova Atividade" para começar</p>
            </div>
          ) : (
            sortedActivities.map(activity => (
              <div
                key={activity._id} // Alterado para _id
                style={{
                  ...styles.card,
                  ...(activity.completed ? styles.cardCompleted : {})
                }}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1)'}
              >
                <div style={styles.cardHeader}>
                  <h3 style={{
                    ...styles.cardTitle,
                    ...(activity.completed ? styles.cardTitleCompleted : {})
                  }}>
                    {activity.title}
                  </h3>
                  <span style={{
                    ...styles.priorityBadge,
                    ...(activity.priority === 'high' ? styles.priorityHigh :
                      activity.priority === 'medium' ? styles.priorityMedium :
                        styles.priorityLow)
                  }}>
                    {activity.priority === 'high' ? 'Alta' :
                      activity.priority === 'medium' ? 'Média' : 'Baixa'}
                  </span>
                </div>

                <p style={{
                  ...styles.cardDescription,
                  ...(activity.completed ? { color: '#6b7280' } : {})
                }}>
                  {activity.description}
                </p>

                <div style={styles.cardDetails}>
                  <div style={styles.detailItem}>
                    <Calendar style={styles.detailIcon} />
                    {formatDate(activity.date)}
                  </div>
                  <div style={styles.detailItem}>
                    <Clock style={styles.detailIcon} />
                    {activity.time}
                  </div>
                  <div style={styles.detailItem}>
                    <Book style={styles.detailIcon} />
                    {activity.subject}
                  </div>
                </div>

                <div style={styles.cardActions}>
                  <button
                    onClick={() => toggleComplete(activity._id)} // Alterado para _id
                    style={{
                      ...styles.actionButton,
                      ...(activity.completed ? styles.reopenButton : styles.completeButton)
                    }}
                    onMouseEnter={(e) => e.target.style.opacity = '0.8'}
                    onMouseLeave={(e) => e.target.style.opacity = '1'}
                  >
                    {activity.completed ? (
                      <>
                        <X style={styles.actionIcon} />
                        Reabrir
                      </>
                    ) : (
                      <>
                        <Check style={styles.actionIcon} />
                        Concluir
                      </>
                    )}
                  </button>
                  <div style={styles.rightActions}>
                    <button
                      onClick={() => handleEdit(activity)}
                      style={styles.iconButton}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#dbeafe'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                    >
                      <Edit style={{ ...styles.editIcon, height: '16px', width: '16px' }} />
                    </button>
                    <button
                      onClick={() => handleDelete(activity._id)} // Alterado para _id
                      style={styles.iconButton}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#fee2e2'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                    >
                      <Trash2 style={{ ...styles.deleteIcon, height: '16px', width: '16px' }} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {/* Modal de Formulário */}
      {showForm && (
        <div style={styles.modal} onClick={resetForm}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>
                {editingActivity ? 'Editar Atividade' : 'Nova Atividade'}
              </h2>
              <button onClick={resetForm} style={styles.closeButton}>
                <X size={24} />
              </button>
            </div>
            
            <div style={styles.form}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Título</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  style={styles.input}
                  placeholder="Ex: Prova de Matemática"
                  onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Descrição</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  style={{ ...styles.input, ...styles.textarea }}
                  placeholder="Ex: Estudar capítulos 5 e 6"
                  onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                />
              </div>

              <div style={styles.row}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Data</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    style={styles.input}
                    onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Horário</label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    style={styles.input}
                    onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                  />
                </div>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Matéria</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  style={styles.input}
                  placeholder="Ex: Matemática"
                  onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Prioridade</label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  style={styles.select}
                >
                  <option value="low">Baixa</option>
                  <option value="medium">Média</option>
                  <option value="high">Alta</option>
                </select>
              </div>

              <div style={styles.modalActions}>
                <button
                  onClick={resetForm}
                  style={styles.cancelButton}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#e5e7eb'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#f3f4f6'}
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSubmit}
                  style={styles.submitButton}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}
                >
                  {editingActivity ? 'Salvar' : 'Criar'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default App;