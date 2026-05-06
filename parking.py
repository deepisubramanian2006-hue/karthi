# Two Wheeler Parking Management

parking = {
    "Zone A": {1: "Free", 2: "Free", 3: "Occupied", 4: "Free", 5: "Occupied"},
    "Zone B": {1: "Free", 2: "Occupied", 3: "Free", 4: "Free"}
}

def block_zone(zone_name):
    """Block all slots in a given zone"""
    if zone_name in parking:
        for slot in parking[zone_name]:
            parking[zone_name][slot] = "Blocked"
        print(f"{zone_name} has been blocked.")
    else:
        print(f"{zone_name} not found!")

def unblock_zone(zone_name):
    """Unblock all slots in a given zone (reset to Free)"""
    if zone_name in parking:
        for slot in parking[zone_name]:
            parking[zone_name][slot] = "Free"
        print(f"{zone_name} has been unblocked.")
    else:
        print(f"{zone_name} not found!")

def show_status():
    """Display current parking status"""
    total = sum(len(slots) for slots in parking.values())
    occupied = sum(1 for zone in parking.values() for s in zone.values() if s == "Occupied")
    blocked = sum(1 for zone in parking.values() for s in zone.values() if s == "Blocked")
    free = total - occupied - blocked

    print(f"Total: {total} | Occupied: {occupied} | Blocked: {blocked} | Free: {free}")
    for zone, slots in parking.items():
        print(zone, slots)

if __name__ == "__main__":
    show_status()
    block_zone("Zone A")
    show_status()
    unblock_zone("Zone A")
    show_status()
