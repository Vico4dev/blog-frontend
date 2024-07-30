<script lang="ts">
    const profilePhotoPath = "https://cloud.4devs.ovh/media/articles/pixlr-image-generator-9e602b30-c2f5-4dd6-a796-4416b7f1154c.png";
  
    const skills = [
      { name: "PHP (Laravel, Symfony, CodeIgniter)", level: 90 },
      { name: "JavaScript (React, Svelte)", level: 85 },
      { name: "HTML/CSS", level: 90 },
      { name: "Python (Django, Flask)", level: 80 },
      { name: "MySQL", level: 85 },
      { name: "Power BI", level: 80 },
      { name: "FME Desktop (ETL)", level: 85 },
      { name: "Analyse des marchés publics", level: 85 },
      { name: "Rédaction de CCTP", level: 80 },
      { name: "Gestion de flotte mobile", level: 85 },
    ];
  
    const experiences = [

      {
        title: "Développeur Web & Gestionnaire de Données",
        company: "Le HAVRE SEINE METROPOLE",
        period: "2020 - Présent",
        description: "Création d'applications de suivi pour la gestion des déchets. Mise en place de tableaux de bord avec Power BI pour l'analyse des données des collectivités. Implémentation de solutions ETL avec FME Desktop."
      },
      {
        title: "Adjoint au chef de secteur Innovation Exploitation",
        company: "CODAH",
        period: "2010 - 2020",
        description: "Développement de sites web avec PHP, MySQL, HTML et CSS. Initiation aux projets liés aux services publics et particuliérement à la gestion de dechets"
      }
    ];
  
    const projects = [
      {
        name: "Application de réservation de salles de réunion 2024",
        tech: "React / Django",
        description: "Système de réservation en temps réel pour la gestion efficace des espaces de réunion."
      },
      {
        name: "Gestion d'indicateurs KPI 2023",
        tech: "React / Django",
        description: "Tableau de bord interactif pour le suivi et l'analyse des indicateurs clés de performance."
      },
      {
        name: "Application de gestion des demandes d'installation de caméras mobiles 2024",
        tech: "Symfony (PHP) / Mysql",
        description: "Plateforme de suivi des demandes et de gestion du déploiement de caméras de surveillance mobiles."
      },
      {
        name: "Application de déclaration et de gestion de dépôts sauvages 2023",
        tech: "Laravel (PHP) / MySQL",
        description: "Système de signalement et de suivi des dépôts sauvages pour améliorer la propreté urbaine."
      }
    ];
  </script>
  
  <div class="container mx-auto px-4 py-8">
    <div class="flex flex-col md:flex-row items-center justify-between mb-8">
      <h1 class="text-4xl font-bold text-center md:text-left mb-4 md:mb-0">Vico - Développeur Full Stack & Analyste Technique</h1>
      <div class="avatar">
        <div class="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <img src={profilePhotoPath} alt="Photo de profil de Vico" />
        </div>
      </div>
    </div>
  
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div class="col-span-2">
        <div class="card bg-base-100 shadow-xl mb-8">
          <div class="card-body">
            <h2 class="card-title text-2xl mb-4">Profil Professionnel</h2>
            <p class="mb-4">
              Développeur Full Stack avec 10 ans d'expérience, spécialisé dans le développement d'applications web et la gestion de données pour les collectivités. 
              Connaissance en analyse des marchés publics, rédaction de CCTP, et gestion de flottes mobiles. 
              Passionné par l'informatique, le développement et les jeux vidéo, j'apporte une approche innovante à la résolution de problèmes complexes dans le secteur public.
            </p>
          </div>
        </div>
  
        <div class="card bg-base-100 shadow-xl mb-8">
          <div class="card-body">
            <h2 class="card-title text-2xl mb-4">Expérience Professionnelle</h2>
            {#each experiences as exp}
              <div class="mb-4">
                <h3 class="text-xl font-semibold">{exp.title}</h3>
                <p class="text-sm text-gray-600">{exp.company} | {exp.period}</p>
                <p class="mt-2">{exp.description}</p>
              </div>
            {/each}
          </div>
        </div>
  
        <div class="card bg-base-100 shadow-xl mb-8">
          <div class="card-body">
            <h2 class="card-title text-2xl mb-4">Expertise Sectorielle</h2>
            <ul class="list-disc list-inside space-y-2">
              <li>Gestion des déchets dans les collectivités</li>
              <li>Optimisation des services publics</li>
              <li>Analyse et visualisation de données urbaines</li>
              <li>Marchés publics et procédures d'appel d'offres</li>
              <li>Gestion de flottes mobiles pour agents de terrain</li>
            </ul>
          </div>
        </div>
  
        <div class="card bg-base-100 shadow-xl mb-8">
          <div class="card-body">
            <h2 class="card-title text-2xl mb-4">Projets Récents</h2>
            {#each projects as project}
              <div class="mb-4">
                <h3 class="text-lg font-semibold">{project.name}</h3>
                <p class="text-sm text-gray-600">{project.tech}</p>
                <p class="mt-1">{project.description}</p>
              </div>
            {/each}
          </div>
        </div>
      </div>
  
      <div>
        <div class="card bg-base-100 shadow-xl mb-8">
          <div class="card-body">
            <h2 class="card-title text-2xl mb-4">Informations</h2>
            <ul class="space-y-2">
              <li><strong>Nom :</strong> Vico</li>
              <li><strong>Âge :</strong> 35 ans</li>
              <li><strong>Email :</strong> vico4dev@gmail.com</li>
              <li><strong>LinkedIn :</strong> <a href="#" class="link link-primary">linkedin.com/in/vico</a></li>
              <li><strong>GitHub :</strong> <a href="#" class="link link-primary">github.com/vico4dev</a></li>
            </ul>
          </div>
        </div>
  
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="card-title text-2xl mb-4">Compétences Techniques</h2>
            {#each skills as skill}
              <div class="mb-2">
                <div class="flex justify-between mb-1">
                  <span>{skill.name}</span>
                  <span>{skill.level}%</span>
                </div>
                <progress class="progress progress-primary w-full" value={skill.level} max="100"></progress>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>
  
    <div class="mt-8 text-center">
      <h2 class="text-2xl font-bold mb-4">Projets et Innovations</h2>
      <p>
        En plus de mes responsabilités professionnelles, je développe constamment des projets personnels innovants, 
        combinant ma passion pour le développement, les jeux vidéo, et mon expertise dans le domaine des services publics. 
        Ces projets visent souvent à améliorer l'efficacité des processus de gestion des collectivités ou à gamifier l'engagement citoyen.
      </p>
    </div>
  </div>