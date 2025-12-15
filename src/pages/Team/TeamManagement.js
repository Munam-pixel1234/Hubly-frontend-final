import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import useTeam from "../../hooks/useTeam";
import useAuth from "../../hooks/useAuth";
import styles from "./Team.module.css";

export default function TeamManagement() {
  const navigate = useNavigate();
  const { team = [], loading, error, createMember, removeMember } = useTeam() || {};
  const auth = useAuth() || {};
  const user = auth.user || null;
  const isAdmin = (user?.role || "Admin") === "Admin";

  // avatars loop (A1..A4)
  const avatars = useMemo(
    () => [
      "/assets/images/A1.png",
      "/assets/images/A2.png",
      "/assets/images/A3.png",
      "/assets/images/A4.png",
    ],
    []
  );

  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [form, setForm] = useState({ name: "", email: "", phone: "", role: "Member" });

  // open delete modal
  const openDeleteModal = (member) => {
    setSelectedUser(member);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!selectedUser) return;
    try {
      await removeMember(selectedUser.id || selectedUser._id);
      setShowDeleteModal(false);
      setSelectedUser(null);
    } catch (err) {
      alert("Failed to delete member: " + (err?.response?.data?.message || err?.message));
    }
  };

  const handleAddMember = async () => {
    if (!form.name || !form.email) {
      alert("Name & Email are required");
      return;
    }
    try {
      await createMember(form);
      setShowAddModal(false);
      setForm({ name: "", email: "", phone: "", role: "Member" });
    } catch (err) {
      alert("Failed to add member: " + (err?.response?.data?.message || err?.message));
    }
  };

  if (loading) return <p className={styles.loading}>Loading...</p>;

  return (
    <div className={styles.wrapper}>
      {/* SIDEBAR */}
      <aside className={styles.sidebar}>
        <img src="/assets/images/L3.png" alt="Hubly" className={styles.logo} />

        <div className={styles.sidebarMenu}>
          <button className={styles.iconItem} onClick={() => navigate("/dashboard")}>
            <img src="/assets/images/L4.png" alt="Dashboard" />
          </button>

          <button className={styles.iconItem} onClick={() => navigate("/tickets")}>
            <img src="/assets/images/L5.png" alt="Tickets" />
          </button>

          <button className={styles.iconItem} onClick={() => navigate("/analytics")}>
            <img src="/assets/images/L6.png" alt="Analytics" />
          </button>

          <button className={styles.iconItem} onClick={() => navigate("/chatbot-settings")}>
            <img src="/assets/images/L7.png" alt="Chatbot" />
          </button>

          <div className={`${styles.iconItem} ${styles.active}`}>
            <img src="/assets/images/L8.png" alt="Team" />
          </div>

          <button className={styles.iconItem} onClick={() => navigate("/account-settings")}>
            <img src="/assets/images/L9.png" alt="Account" />
          </button>
        </div>

        <div className={styles.sidebarBottom}>
          <img src="/assets/images/L10.png" alt="profile" className={styles.profile} />
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className={styles.content}>
        <h2 className={styles.pageTitle}>Team</h2>

        {/* thin line pair and header row as figma */}
        <div className={styles.headerLines}>
          <div className={styles.topLine} />
          <div className={styles.headerRow}>
            <div className={styles.colName}>
              Full Name <span className={styles.sortIcon}>↕</span>
            </div>
            <div className={styles.colPhone}>Phone</div>
            <div className={styles.colEmail}>Email</div>
            <div className={styles.colRole}>role</div>
            {isAdmin && <div className={styles.colActions} />}
          </div>
          <div className={styles.bottomLine} />
        </div>

        {/* Table rows */}
        <div className={styles.tableBody}>
          {team.length === 0 ? (
            <p className={styles.empty}>No team members yet.</p>
          ) : (
            team.map((member, idx) => (
              <div className={styles.row} key={member.id || member._id}>
                <div className={styles.colName}>
                  <img
                    src={avatars[idx % avatars.length]}
                    alt="avatar"
                    className={styles.avatar}
                  />
                  <span className={styles.nameText}>{member.name || member.userName || "—"}</span>
                </div>

                <div className={styles.colPhone}>{member.phone || "+1 (000) 000-0000"}</div>

                <div className={styles.colEmail}>{member.email || "example@gmail.com"}</div>

                <div className={styles.colRole}>
                  {/* Role display + optional dropdown (read-only in rows, editable in modal) */}
                  <span className={styles.roleBadge}>{member.role || "Member"}</span>
                </div>

                {isAdmin && (
                  <div className={styles.colActions}>
                    <button
                      aria-label="edit"
                      className={styles.actionIcon}
                      onClick={() => {
                        // open add modal with data for edit (simple inline edit experience)
                        setForm({
                          name: member.name || "",
                          email: member.email || "",
                          phone: member.phone || "",
                          role: member.role || "Member",
                        });
                        setShowAddModal(true);
                      }}
                    >
                      <img
                      src="/assets/images/editline.png"
                      alt="Edit"
                      className={styles.actionImg}
                       />
                    </button>

                    <button
                      aria-label="delete"
                      className={styles.actionIcon}
                      onClick={() => openDeleteModal(member)}
                    >
                      <img
                       src="/assets/images/del.png"
                       alt="delete"
                       className={styles.actionImg}
                        />
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Add Team button */}
        {isAdmin && (
          <div className={styles.addButtonWrap}>
            <button className={styles.addNewBtn} onClick={() => setShowAddModal(true)}>
              <span className={styles.plus}>
                <img
                src="/assets/images/teamadd.png"
                alt="Edit"
                className={styles.actionImg}
                 />
                </span> Add Team members
            </button>
          </div>
        )}

        {error && <div className={styles.errorText}>{String(error)}</div>}
      </main>

      {/* ADD MEMBER MODAL */}
      {showAddModal && (
        <div className={styles.modalOverlay} role="dialog" aria-modal>
          <div className={styles.modal}>
            <h2 className={styles.modalTitle}>Add Team members</h2>
            <p className={styles.modalDesc}>
              Talk with colleagues in a group chat. Messages in this group are only visible to it's
              participants. New teammates may only be invited by the administrators.
            </p>

            <label className={styles.modalLabel}>User name</label>
            <input
              className={styles.modalInput}
              placeholder="User name"
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            />

            <label className={styles.modalLabel}>Email ID</label>
            <input
              className={styles.modalInput}
              placeholder="Email ID"
              value={form.email}
              onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
            />

            <label className={styles.modalLabel}>Designation</label>
            <select
              className={styles.modalSelect}
              value={form.role}
              onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))}
            >
              <option>Member</option>
              <option>Admin</option>
            </select>

            <div className={styles.modalFooter}>
              <button
                className={styles.cancelBtn}
                onClick={() => {
                  setShowAddModal(false);
                  setForm({ name: "", email: "", phone: "", role: "Member" });
                }}
              >
                Cancel
              </button>

              <button className={styles.saveBtn} onClick={handleAddMember}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION */}
      {showDeleteModal && (
        <div className={styles.modalOverlay} role="dialog" aria-modal>
          <div className={styles.deleteModal}>
            <p className={styles.deleteMsg}>This teammate will be deleted.</p>

            <div className={styles.deleteFooter}>
              <button
                className={styles.deleteCancel}
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedUser(null);
                }}
              >
                Cancel
              </button>

              <button className={styles.deleteConfirm} onClick={confirmDelete}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
