import { useState, useEffect } from "react";
import { getAllMembers, addTeamMember, deleteTeamMember } from "../api/teamApi";

const useTeam = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTeam = async () => {
    setLoading(true);
    try {
      const res = await getAllMembers();
      setTeam(res?.members || []);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to fetch team");
    } finally {
      setLoading(false);
    }
  };

  const createMember = async (data) => {
    await addTeamMember(data);
    fetchTeam();
  };

  const removeMember = async (id) => {
    await deleteTeamMember(id);
    fetchTeam();
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  return { team, loading, error, createMember, removeMember };
};

export default useTeam;
