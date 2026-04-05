import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTransaction, updateTransaction } from "../../store/slices/transactionsSlice";
import { closeModal, selectActiveModal } from "../../store/slices/uiSlice";
import Modal from "./Modal";
import { Select } from "./Select";
import { TextInput, NumberInput, DateInput, FieldLabel } from "./Inputs";
import { CATEGORIES } from "../../data/mockData";
import { useTheme } from "../../hooks/useTheme";
import { format } from "date-fns";
import toast from "react-hot-toast";

const CATEGORY_OPTIONS = CATEGORIES.map((c) => ({
  value: c.id,
  label: c.label,
  color: c.color,
}));

const STATUS_OPTIONS = [
  { value: "completed", label: "Completed" },
  { value: "pending", label: "Pending" },
];

export default function TransactionModal({ editData = null }) {
  const dispatch = useDispatch();
  const activeModal = useSelector(selectActiveModal);
  const { isDark } = useTheme();
  const isOpen = activeModal === "addTransaction" || activeModal === "editTransaction";

  const [form, setForm] = useState({
    type: "expense",
    description: "",
    amount: "",
    category: "food",
    date: format(new Date(), "yyyy-MM-dd"),
    status: "completed",
  });

  useEffect(() => {
    if (editData) {
      setForm({ ...editData, amount: String(editData.amount) });
    } else {
      setForm({
        type: "expense",
        description: "",
        amount: "",
        category: "food",
        date: format(new Date(), "yyyy-MM-dd"),
        status: "completed",
      });
    }
  }, [editData, isOpen]);

  if (!isOpen) return null;

  const set = (key) => (val) => setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.description.trim() || !form.amount || isNaN(Number(form.amount))) {
      toast.error("Please fill in all fields correctly.");
      return;
    }
    const payload = { ...form, amount: parseFloat(form.amount) };
    if (editData) {
      dispatch(updateTransaction(payload));
      toast.success("Transaction updated.");
    } else {
      dispatch(addTransaction(payload));
      toast.success("Transaction added.");
    }
    dispatch(closeModal());
  };

  const toggleBorder = isDark ? "border-[#242424]" : "border-[#e2e2e2]";

  return (
    <Modal
      title={editData ? "Edit Transaction" : "Add Transaction"}
      onClose={() => dispatch(closeModal())}
    >
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Type toggle */}
        <div>
          <FieldLabel>Type</FieldLabel>
          <div className={`flex rounded-lg border overflow-hidden ${toggleBorder}`}>
            {["expense", "income"].map((t) => (
              <button
                type="button"
                key={t}
                onClick={() => setForm((f) => ({ ...f, type: t }))}
                className={`flex-1 py-2 text-xs font-semibold capitalize transition-all duration-150 ${
                  form.type === t
                    ? t === "income"
                      ? "bg-emerald-500 text-white"
                      : "bg-red-500 text-white"
                    : isDark
                    ? "text-[#555] hover:text-white hover:bg-[#1a1a1a]"
                    : "text-[#bbb] hover:text-black hover:bg-[#f5f5f5]"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        <div>
          <FieldLabel>Description</FieldLabel>
          <TextInput
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            placeholder="e.g. Monthly Salary, Netflix"
          />
        </div>

        {/* Amount + Category */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <FieldLabel>Amount</FieldLabel>
            <NumberInput
              value={form.amount}
              onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
              placeholder="0.00"
            />
          </div>
          <div>
            <FieldLabel>Category</FieldLabel>
            <Select
              value={form.category}
              onValueChange={set("category")}
              options={CATEGORY_OPTIONS}
              placeholder="Pick category"
            />
          </div>
        </div>

        {/* Date + Status */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <FieldLabel>Date</FieldLabel>
            <DateInput
              value={form.date}
              onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
            />
          </div>
          <div>
            <FieldLabel>Status</FieldLabel>
            <Select
              value={form.status}
              onValueChange={set("status")}
              options={STATUS_OPTIONS}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={() => dispatch(closeModal())}
            className={`flex-1 py-2 rounded-lg text-xs font-semibold border transition-all active:scale-95 ${
              isDark
                ? "border-[#242424] text-[#666] hover:text-white hover:border-[#444]"
                : "border-[#e2e2e2] text-[#aaa] hover:text-black hover:border-[#bbb]"
            }`}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all active:scale-95 ${
              isDark
                ? "bg-white text-black hover:bg-white/90"
                : "bg-black text-white hover:bg-black/90"
            }`}
          >
            {editData ? "Save Changes" : "Add Transaction"}
          </button>
        </div>
      </form>
    </Modal>
  );
}