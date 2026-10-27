'use strict';
// Single source for the staff directory and profile pages. Edit entries here.
// Fields: id (url-safe, unique), name, title, category, photo, email, phone, researchgate, scholar, bio (array of paragraphs).
const CATEGORIES = ['Management', 'Academic Staff', 'Administration Staff', 'Academic Registry'];
const STAFF = [
  { id: 'dr-charity-basaza-mulenga', name: 'Dr. Charity Basaza Mulenga', title: 'Vice Chancellor', category: 'Management', photo: 'assets/img/vc.jpg', email: 'vc@kcu.ac.ug', phone: '+256 200 911 450',
    researchgate: 'https://www.researchgate.net/', scholar: 'https://scholar.google.com/',
    qualifications: ['PhD in Education Management (demo)', 'Master of Education (demo)', 'Bachelor of Education (demo)'],
    interests: ['Higher education leadership', 'Quality assurance', 'Research and innovation', 'Student-centred learning'],
    publications: ['Demo: Leadership and quality assurance in Ugandan universities. Journal of Higher Education, 2022.', 'Demo: Building university partnerships for innovation. African Education Review, 2020.'],
    supervision: ['Demo: Supervised postgraduate research in education management.', 'Demo: Mentors early-career academics and research students.'],
    more: ['Demo: Member, professional bodies in higher education.', 'Demo: Speaker at national and international education conferences.'],
    bio: [
      'Dr. Charity Basaza Mulenga is the Vice Chancellor of King Ceasor University, providing academic and administrative leadership to the University community.',
      'She is an accomplished educator, researcher and administrator with extensive experience in higher education leadership, quality assurance and institutional development. Under her leadership, KCU continues to grow its programmes, strengthen partnerships and expand opportunities for learners across Uganda and beyond.',
      'Her professional interests include academic excellence, research and innovation, student-centred learning, and building collaborations with universities and institutions around the world.',
      'She is committed to the University motto, “Ignite the Future”, and to preparing graduates who lead with integrity and make a meaningful difference in society.',
      'Note: this profile contains demo content. Replace it with the official biography before publishing.'
    ] },
  { id: 'deputy-vice-chancellor', name: 'Name to be added', title: 'Deputy Vice Chancellor', category: 'Management', bio: ['Profile to be added.'] },
  { id: 'university-secretary', name: 'Name to be added', title: 'University Secretary', category: 'Management', bio: ['Profile to be added.'] },
  { id: 'dean-health', name: 'Name to be added', title: 'Dean, School of Medicine, Health & Life Sciences', category: 'Academic Staff', bio: ['Profile to be added.'] },
  { id: 'dean-law-management', name: 'Name to be added', title: 'Dean, School of Law & Management Sciences', category: 'Academic Staff', bio: ['Profile to be added.'] },
  { id: 'dean-science-computing', name: 'Name to be added', title: 'Dean, School of Science, Computing & Engineering', category: 'Academic Staff', bio: ['Profile to be added.'] },
  { id: 'academic-registrar', name: 'Name to be added', title: 'Academic Registrar', category: 'Academic Registry', bio: ['Profile to be added.'] },
  { id: 'admissions-officer', name: 'Name to be added', title: 'Admissions Officer', category: 'Academic Registry', bio: ['Profile to be added.'] },
  { id: 'human-resource-manager', name: 'Name to be added', title: 'Human Resource Manager', category: 'Administration Staff', bio: ['Profile to be added.'] },
  { id: 'finance-manager', name: 'Name to be added', title: 'Finance Manager', category: 'Administration Staff', bio: ['Profile to be added.'] },
  { id: 'university-librarian', name: 'Name to be added', title: 'University Librarian', category: 'Administration Staff', bio: ['Profile to be added.'] },
  { id: 'dean-of-students', name: 'Name to be added', title: 'Dean of Students', category: 'Administration Staff', bio: ['Profile to be added.'] }
];
// Optional per-person lists: qualifications, interests, publications, supervision, more (arrays of strings).
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const initials = n => n.replace(/^(Dr|Prof|Mr|Mrs|Ms|Hon|Rev)\.?\s+/i, '').split(/\s+/).slice(0, 2).map(w => w[0]).join('').toUpperCase();
