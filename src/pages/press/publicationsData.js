import clinicalBurns from '../../assets/publications/clinical-flip7-burns-2022.pdf';
import herpesvirus from '../../assets/publications/herpesvirus-skin-2022.pdf';
import flip7Allantoin from '../../assets/publications/flip7-allantoin-burns-2020.pdf';
import biofilm from '../../assets/publications/biofilm-infections-2018.pdf';
import antimicrobialComplexes from '../../assets/publications/antimicrobial-peptide-complexes-2017.pdf';
import fatBody from '../../assets/publications/fat-body-hemocyte-2016.pdf';
import insectPeptides from '../../assets/publications/insect-antimicrobial-peptides-2015.pdf';
import antiTumorAllostatin from '../../assets/publications/anti-tumor-allostatin-patterns-2013.pdf';
import surgicalMaggots from '../../assets/publications/surgical-maggots-history-2013.pdf';
import antiTumorPeptide from '../../assets/publications/anti-tumor-peptide-2013.pdf';
import blowflyImmune from '../../assets/publications/blowfly-immune-system-2011.pdf';
import calliphoraRu from '../../assets/publications/immune-system-calliphora-2011-ru.pdf';
import pnas from '../../assets/publications/antiviral-antitumor-peptides-2002.pdf';
import molluscPeptides from '../../assets/publications/mollusc-antimicrobial-peptides-1996.pdf';

export const publicationsData = [
  {
    id: 'clinical-flip7-burns-2022', year: 2022, pdf: clinicalBurns,
    ru: { title: 'Клиническая оценка эффективности комплекса природных антимикробных пептидов FLIP-7 при лечении пограничных ожогов кожи', authors: 'Е. В. Зиновьев, Д. В. Костяков, А. В. Семиглазов, П. К. Крылов, В. А. Мануковский', journal: 'Вестник Российской военно-медицинской академии, том 24, № 3' },
    en: { title: 'Clinical Evaluation of the Effectiveness of FLIP-7 Natural Antimicrobial Peptides in the Treatment of Borderline Skin Burns', authors: 'E. V. Zinoviev, D. V. Kostyakov, A. V. Semiglazov, P. K. Krylov, V. A. Manukovskii', journal: 'Bulletin of the Russian Military Medical Academy, vol. 24, no. 3' },
  },
  {
    id: 'herpesvirus-skin-2022', year: 2022, pdf: herpesvirus,
    ru: { title: 'Новые подходы к лечению герпесвирусных поражений кожи и слизистых оболочек', authors: 'В. Корнишева, Н. Гордя, Ю. Макарова', journal: 'Проблемы медицинской микологии' },
    en: { title: 'New Approaches to the Treatment of Herpesvirus Lesions of the Skin and Mucous Membranes', authors: 'V. Kornisheva, N. Gordya, Yu. Makarova', journal: 'North-Western State Medical University named after I. I. Mechnikov' },
  },
  {
    id: 'flip7-allantoin-burns-2020', year: 2020, pdf: flip7Allantoin,
    ru: { title: 'Клиническая оценка гидрогелевого раневого покрытия с комплексом природных антимикробных пептидов FLIP7 и аллантаином при дермальных ожогах', authors: 'Д. В. Костяков, Е. В. Зиновьев, К. М. Крылов, П. К. Крылов, О. В. Орлова, В. Солошенко', journal: 'Вестник Национального медико-хирургического Центра им. Н. И. Пирогова' },
    en: { title: 'Clinical Evaluation of a Hydrogel Wound Dressing with FLIP7 Natural Antimicrobial Peptides and Allantoin in Dermal Burns', authors: 'D. V. Kostyakov, E. V. Zinoviev, K. M. Krylov, P. K. Krylov, O. V. Orlova, V. V. Soloshenko', journal: 'Saint Petersburg I. I. Dzhanelidze Research Institute of Emergency Medicine' },
  },
  {
    id: 'biofilm-infections-2018', year: 2018, pdf: biofilm,
    ru: { title: 'Biofilm infections between Scylla and Charybdis: interplay of host antimicrobial peptides and antibiotics', authors: 'S. Chernysh, N. Gordya, D. Tulin, A. Yakovlev', journal: 'Infection and Drug Resistance' },
    en: { title: 'Biofilm infections between Scylla and Charybdis: interplay of host antimicrobial peptides and antibiotics', authors: 'S. Chernysh, N. Gordya, D. Tulin, A. Yakovlev', journal: 'Infection and Drug Resistance' },
  },
  {
    id: 'antimicrobial-peptide-complexes-2017', year: 2017, pdf: antimicrobialComplexes,
    ru: { title: 'Natural antimicrobial peptide complexes in the fighting of antibiotic resistant biofilms: Calliphora vicina medicinal maggots', authors: 'S. Chernysh, N. Gordya, A. Yakovlev, A. Kruglikova, D. Tulin, E. Potolitsina, T. Suborova, D. Bordo, C. Rosano', journal: 'PLOS ONE' },
    en: { title: 'Natural antimicrobial peptide complexes in the fighting of antibiotic resistant biofilms: Calliphora vicina medicinal maggots', authors: 'S. Chernysh, N. Gordya, A. Yakovlev, A. Kruglikova, D. Tulin, E. Potolitsina, T. Suborova, D. Bordo, C. Rosano', journal: 'PLOS ONE' },
  },
  {
    id: 'fat-body-hemocyte-2016', year: 2016, pdf: fatBody,
    ru: { title: 'Fat body and hemocyte contribution to the antimicrobial peptide synthesis in Calliphora vicina R.-D. (Diptera: Calliphoridae) larvae', authors: 'A. Yakovlev, N. Gordya, A. Kruglikova, D. Tulin, A. Nesin, N. Simonenko, S. Chernysh', journal: 'Animal' },
    en: { title: 'Fat body and hemocyte contribution to the antimicrobial peptide synthesis in Calliphora vicina R.-D. (Diptera: Calliphoridae) larvae', authors: 'A. Yakovlev, N. Gordya, A. Kruglikova, D. Tulin, A. Nesin, N. Simonenko, S. Chernysh', journal: 'Animal' },
  },
  {
    id: 'insect-antimicrobial-peptides-2015', year: 2015, pdf: insectPeptides,
    ru: { title: 'Insect Antimicrobial Peptide Complexes Prevent Resistance Development in Bacteria', authors: 'S. Chernysh, N. Gordya, T. Suborova', journal: 'PLOS ONE' },
    en: { title: 'Insect Antimicrobial Peptide Complexes Prevent Resistance Development in Bacteria', authors: 'S. Chernysh, N. Gordya, T. Suborova', journal: 'PLOS ONE' },
  },
  {
    id: 'anti-tumor-allostatin-patterns-2013', year: 2013, pdf: antiTumorAllostatin,
    ru: { title: 'Anti-tumor activity of a peptide combining patterns of insect alloferons and mammalian immunoglobulins in naïve and tumor antigen vaccinated mice', authors: 'S. Chernysh, I. Kozuharova', journal: 'International Immunopharmacology' },
    en: { title: 'Anti-tumor activity of a peptide combining patterns of insect alloferons and mammalian immunoglobulins in naïve and tumor antigen vaccinated mice', authors: 'S. Chernysh, I. Kozuharova', journal: 'International Immunopharmacology' },
  },
  {
    id: 'surgical-maggots-history-2013', year: 2013, pdf: surgicalMaggots,
    ru: { title: 'Хирургические личинки и история их медицинского применения', authors: 'А. Кругликов, С. Черныш', journal: 'Энтомологическое обозрение' },
    en: null,
  },
  {
    id: 'anti-tumor-peptide-2013', year: 2013, pdf: antiTumorPeptide,
    ru: { title: 'Anti-tumor peptide combining patterns of insect and mammalian immunologically relevant proteins', authors: 'S. Chernysh, I. Kozuharova', journal: 'International Immunopharmacology' },
    en: { title: 'Anti-tumor peptide combining patterns of insect and mammalian immunologically relevant proteins', authors: 'S. Chernysh, I. Kozuharova', journal: 'International Immunopharmacology' },
  },
  {
    id: 'blowfly-immune-system-2011', year: 2011, pdf: blowflyImmune,
    ru: { title: 'The Immune System of Maggots of the Blow Fly (Calliphora vicina) as a Source of Medicinal Drugs', authors: 'S. Chernysh, N. Gordya', journal: 'Journal of Evolutionary Biochemistry and Physiology' },
    en: { title: 'The Immune System of Maggots of the Blow Fly (Calliphora vicina) as a Source of Medicinal Drugs', authors: 'S. Chernysh, N. Gordya', journal: 'Journal of Evolutionary Biochemistry and Physiology' },
  },
  {
    id: 'immune-system-calliphora-2011-ru', year: 2011, pdf: calliphoraRu,
    ru: { title: 'Иммунная система личинок Calliphora vicina (Diptera, Calliphoridae) как источник лекарственных веществ', authors: 'С. Черныш, Н. Гордя', journal: 'Журнал эволюционной биохимии и физиологии' },
    en: null,
  },
  {
    id: 'antiviral-antitumor-peptides-2002', year: 2002, pdf: pnas,
    ru: { title: 'Antiviral and antitumor peptides from insects', authors: 'S. Chernysh, S. I. Kim, G. Bekker, V. Pleskach, N. Filatova, V. Anikin, V. Platonov, P. Bulet', journal: 'PNAS' },
    en: { title: 'Antiviral and antitumor peptides from insects', authors: 'S. Chernysh, S. I. Kim, G. Bekker, V. Pleskach, N. Filatova, V. Anikin, V. Platonov, P. Bulet', journal: 'PNAS' },
  },
  {
    id: 'mollusc-antimicrobial-peptides-1996', year: 1996, pdf: molluscPeptides,
    ru: { title: 'ISOLATION OF SEVERAL CYSTEINE-RICH ANTIMICROBIAL PEPTIDES FROM THE BLOOD OF A MOLLUSC, MYTILUS EDULIS', authors: 'M. Charlet, S. Chernysh, H. Philippei, C. Hetru, J. A. Hoffmann, P. Bulet', journal: 'Journal of Biological Chemistry' },
    en: { title: 'ISOLATION OF SEVERAL CYSTEINE-RICH ANTIMICROBIAL PEPTIDES FROM THE BLOOD OF A MOLLUSC, MYTILUS EDULIS', authors: 'M. Charlet, S. Chernysh, H. Philippei, C. Hetru, J. A. Hoffmann, P. Bulet', journal: 'Journal of Biological Chemistry' },
  },
];
