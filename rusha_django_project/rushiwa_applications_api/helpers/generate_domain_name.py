import yaml

env = 'local'

def generate_domain_name(application_name):
    """Generate a domain name for the application.

    Args:

        application_name (str): The name of the application.

    Returns:

        str: A domain name.

    """
    try:
        if env == 'local':
            domain_name = f"{application_name}.localhost"
            return domain_name

        elif env == 'production':
            pass

    except Exception as e:
        raise e