// Pt.1 A
export interface Contact {
  name: string;
  tel: string | string[];
  code: string;
}

export const mergeDuplicateContacts = (contacts: Contact[]): Contact[] => {
  const contactMap = new Map<string, Contact>();

  contacts.forEach((contact) => {
    const key = `${contact.name}-${contact.code}`;
    const existing = contactMap.get(key);

    if (existing) {
      existing.tel = [
        ...(Array.isArray(existing.tel) ? existing.tel : [existing.tel]),
        ...(Array.isArray(contact.tel) ? contact.tel : [contact.tel]),
      ];
    } else {
      contactMap.set(key, { ...contact });
    }
  });

  return Array.from(contactMap.values());
};

// Pt.1 B
export interface CustomerInput {
  customer: string;
  contact: { name: string }[];
  address: string;
}

export const mapContactsWithCustomerInfo = (input: CustomerInput) => {
  const { contact, customer, address } = input;
  return contact.map((person) => ({
    name: person.name,
    customer,
    address,
  }));
};

// Pt.1 C
export interface Person {
  name: string;
  age: string;
}

export const expectedName = (input: Person[]): string[] => {
  const nameSet = new Set(["B", "J", "D", "I", "G", "A"]);

  return input
    .reduce<{ name: string; age: number }[]>((acc, person) => {
      if (nameSet.has(person.name)) {
        acc.push({ name: person.name, age: parseInt(person.age, 10) });
      }
      return acc;
    }, [])
    .sort((a, b) => a.age - b.age)
    .map((p) => p.name);
};

export const correctlyOutputsFromQuestionC = (input: Person[]): string[] => {
  const nameSet = new Set(["B", "J", "D", "I", "G", "A"]);
  const checkCorrectOutput = input.map((person) => {
    if (nameSet.has(person.name)) {
      return `This is ${person.name}, It correctly outputs from question C.`;
    }
    return `This is ${person.name}, It does not correctly outputs from question C.`;
  });

  return checkCorrectOutput;
};