## Prerequisites

Before you start, make sure you have:

- **NodeJs** - The Salesforce CLI requires it internally. Download from [here](https://nodejs.org/en/download). 
- **Salesforce CLI** - Download from [developer.salesforce.com/tools/salesforcecli](https://developer.salesforce.com/tools/salesforcecli). See [Install Salesforce CLI](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_install_cli.htm) for details.
- **VS Code with Salesforce Extension Pack** - See [Installation Instructions](https://developer.salesforce.com/docs/platform/sfvscode-extensions/guide/install.html) for details. Includes the Agentforce Vibes extension.
- **A development org** - Sign up for a free Developer Edition org [here](https://developer.salesforce.com/signup).
- **Git** - Requiered to clone the repository. [here](https://git-scm.com). 


## Get Started

1. **Clone the repository**
```bash
   git clone https://github.com/FernandoJoachin/professional-readiness-sprint.git
   cd professional-readiness-sprint
```

2. **Authorize your org**
```bash
   sf org login web -a <your-org-alias> -d
```
   This opens a browser window to log in org.

3. **Apex tests:**
```bash
sf apex run test -o <your-org-alias> --tests AccountSearchControllerTest --result-format human --synchronous
```

4. **Deploy the source to your org**
```bash
   sf project deploy start -o <your-org-alias>
```

