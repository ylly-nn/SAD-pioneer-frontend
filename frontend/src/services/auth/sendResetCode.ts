export const sendResetCode = async (email: string) => {
  const response = await fetch("/api/auth/forgot-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    throw new Error("Ошибка отправки кода");
  }

  return response.json();
};