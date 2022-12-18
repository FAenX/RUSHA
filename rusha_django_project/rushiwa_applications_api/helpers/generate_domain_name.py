import yaml

def generate_domain_name(application_name):
    """Generate a domain name for the application.

    Args:

        application_name (str): The name of the application.

    Returns:

        str: A domain name.

    """
    try:
            domain_name = "example.com"
            return domain_name
    except Exception as e:
        raise e