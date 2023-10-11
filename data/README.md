# Data Scraping 

This folder contains the `repos.py` script which was used to get dummy data to fill the product catalog with. 

I included this file simply to show how I got the data, and is not necessary to be ran again as the results have already been hardcoded on the server in the `server/src/data/products.json` file.

> *Note this script throttles the GitHub API and cannot be run multiple times back to back before hitting the limit rates*

## Installation

1. Make sure you have Python 3.x installed. If not, download it from [here](https://www.python.org/downloads/).
2. Install the required Python package by running the following command:

    ```bash
    pip3 install -r requirements.txt
    ```

## Running the Script

To run the script, navigate to the directory containing `repos.py` and execute the following command:

```bash
python3 repos.py
```