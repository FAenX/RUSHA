import yaml 


def get_hostname():
    """Get host_name.

    Returns:

        str: host_name.

    """
    try:
        return f"example.com"
    except Exception as e:
        raise e